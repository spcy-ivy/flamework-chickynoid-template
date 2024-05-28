import { OnStart, Service } from "@flamework/core";
import { ServerModule } from "server/chickynoid/ServerModule"
import { ReplicatedStorage, ServerScriptService, Workspace } from "@rbxts/services";
import { ServerMods } from "server/chickynoid/ServerMods";

@Service()
export class Chickynoid implements OnStart {
	onStart() {
		ServerModule.RecreateCollisions(Workspace.FindFirstChild("GameArea") as Model)

		ServerMods.RegisterMods("servermods", ServerScriptService.TS.chickynoid.servermods)
		ServerMods.RegisterMods("characters", ReplicatedStorage.TS.chickynoid.characters)

		ServerModule.Setup()
	}
}
