import Signal from "@rbxts/signal";
import PlayerRecord from "types/chickynoid/PlayerRecord";
import ServerModule from "./ServerModule";
import Simulation from "shared/chickynoid/shared/Simulation/Simulation";

interface ServerChickynoid {
	playerRecord: PlayerRecord;
	hitBox: Part;
	simulation: Simulation;
	bufferedCommandTime: number;

	smoothFactor: number;

	hitBoxCreated: Signal<(hitBox: Part) => void>;

	SetPosition(position: Vector3, teleport: boolean): void;
	GetPosition(): Vector3;

	HandleEvent(server: typeof ServerModule, event: unknown): void;

	Destroy(): void;
}

interface ServerChickynoidConstructor {
	/**
	 * Constructed internally. Do not use directly.
	 * @private
	 */
	new (): ServerChickynoid;
}

declare const ServerChickynoid: ServerChickynoidConstructor;
export = ServerChickynoid;
