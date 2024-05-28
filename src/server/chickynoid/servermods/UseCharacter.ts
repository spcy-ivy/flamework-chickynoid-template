import { ServerModule } from "server/chickynoid/ServerModule"
import PlayerRecord from "types/chickynoid/PlayerRecord";
import { ServerMod } from "types/chickynoid/ServerMod";

export = {
  Setup(server: typeof ServerModule) {
  	server.OnPlayerConnected.Connect((_server: typeof ServerModule, playerRecord: PlayerRecord) => {
  		playerRecord.SetCharacterMod("Character")
  	})
  }
} as ServerMod
