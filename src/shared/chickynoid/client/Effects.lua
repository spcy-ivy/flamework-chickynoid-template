local RunService = game:GetService("RunService")

local module = {}

module.root = script.Parent.Parent.Assets:FindFirstChild("Effects")
module.particles = {}

--Ultra simple effects module.
function module:SpawnEffect(name, pos)
    local src = module.root:FindFirstChild(name, true)

    if src == nil then
        warn("Effect not found " .. name)
        return
    end

    local clone = src:Clone() :: BasePart
    clone.Position = pos
    clone.Parent = game.Workspace

    local record = {}
    record.instance = clone
    record.emitters = {}
    record.sounds = {}

    for _, value in pairs(clone:GetDescendants()) do
        if value:IsA("ParticleEmitter") then
            value = value :: ParticleEmitter -- Luau types moment :(

            local emitterRecord = {}
            emitterRecord.instance = value
            emitterRecord.life = 0

            emitterRecord.afterLife = value.Lifetime.Max
            local lifeAttribute = value:GetAttribute("life")
            if lifeAttribute ~= nil then
                emitterRecord.life = lifeAttribute
            end

            local emitAttribute = value:GetAttribute("emit")
            if emitAttribute then
                emitterRecord.instance:Emit(emitAttribute)
                emitterRecord.instance.Rate = 0
                emitterRecord.life = 0
            end

            record.emitters[value] = emitterRecord
        elseif value:IsA("Sound") then
            value = value :: Sound -- Luau types moment x2 :(

            value:Play()

            local variation = value:GetAttribute("variation")

            if variation then
                value.PlaybackSpeed *= 1 + (math.random() * variation)
            end

            local soundRecord = {}
            soundRecord.life = value.TimeLength / value.PlaybackSpeed
            soundRecord.instance = value
            record.sounds[value] = soundRecord
        end
    end

    module.particles[clone] = record

    return clone
end

function module:Heartbeat(deltaTime)
    for key, record in pairs(module.particles) do
        local allDone = true
        for _, particleRecord in pairs(record.emitters) do
            if particleRecord.life > 0 then
                particleRecord.life -= deltaTime
                if particleRecord.life <= 0 then
                    --stop emitting
                    particleRecord.instance.Rate = 0
                end
            else
                particleRecord.afterLife -= deltaTime
            end

            if particleRecord.afterLife < 0 and particleRecord.instance ~= nil then
                particleRecord.instance:Destroy()
            end

            if particleRecord.afterLife > 0 then
                allDone = false
            end
        end
        for _, soundRecord in pairs(record.sounds) do
            if soundRecord.life > 0 then
                allDone = false
                soundRecord.life -= deltaTime
            end
        end

        if allDone == true then
            record.instance:Destroy()
            module.particles[key] = nil
        end
    end
end

-- TODO: We shouldn't connect to heartbeat here. Refactor this later.
RunService.Heartbeat:Connect(function(deltaTime)
    module:Heartbeat(deltaTime)
end)

function Preload()
	task.spawn(function()
		
		local list = {}
		for key,value in module.root:GetDescendants() do
			
			if (value:IsA("ParticleEmitter")) then
				table.insert(list, value.Texture)
			end
		end
		print("Preloading ", #list, " assets")
		game.ContentProvider:PreloadAsync(list)
	end)
end
Preload()

return module