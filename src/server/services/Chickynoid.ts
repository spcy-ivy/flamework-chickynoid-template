import { OnInit, OnStart, Service } from "@flamework/core";
import ServerModule from "server/chickynoid/ServerModule"
import { Players, ReplicatedStorage, ServerScriptService, Workspace } from "@rbxts/services";
import ServerMods from "server/chickynoid/ServerMods";

@Service()
export class Chickynoid implements OnInit, OnStart {
	onInit() {
  	// have to disable this or else two characters spawn :(
		Players.CharacterAutoLoads = false
	}
  
	onStart() {
		ServerModule.RecreateCollisions(Workspace.FindFirstChild("GameArea") as Model)

		ServerMods.RegisterMods("servermods", ServerScriptService.TS.chickynoid.servermods)
		ServerMods.RegisterMods("characters", ReplicatedStorage.TS.chickynoid.characters)

		ServerModule.Setup()
	}
}
