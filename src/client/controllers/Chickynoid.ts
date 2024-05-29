import { Controller, OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import ClientMods from "shared/chickynoid/client/ClientMods";
import ClientModule from "shared/chickynoid/client/ClientModule";

@Controller()
export class Chickynoid implements OnStart {
	onStart() {	
		ClientMods.RegisterMods("clientmods", ReplicatedStorage.TS.chickynoid.clientmods)	
		ClientMods.RegisterMods("characters", ReplicatedStorage.TS.chickynoid.characters)
  	
		ClientModule.Setup()
	}
}
