import { ServerModule } from "server/chickynoid/ServerModule";
import PlayerRecord from "./PlayerRecord";

export interface ServerMod {
	GetPriority?(): number;

	Step(server: typeof ServerModule, deltaTime: number): void;

	Setup(server: typeof ServerModule): void;

	CanPlayerSee?(sourcePlayer: PlayerRecord, otherPlayer: PlayerRecord): boolean;
}
