import WeaponsServer from "server/chickynoid/WeaponsServer";
import PlayerRecord from "./PlayerRecord";

export interface WeaponModule<State = {}, Command = {}> {
	clientState: State;
	serverState: State;
	name?: string;
	client?: unknown;
	/** Only available on server. */
	weaponModule: WeaponsServer;
	preservePredictedStateTimer: number;
	serverStateDirty: boolean;
	playerRecord?: PlayerRecord;
	previousState: State;
	state: State;
	weaponId: number;
	totalTime: number;
	serial: number;

	ClientThink(deltaTime: number): void;

	ClientProcessCommand(command: unknown): void;

	ClientSetup(): void;

	ClientEquip(): void;

	ClientDequip(): void;

	ClientRemoved(): void;

	ClientOnBulletImpact(client: unknown, event: unknown): void;

	ServerThink(deltaTime: number): void;

	ServerProcessCommand(command: unknown): void;

	ServerSetup(): void;

	ServerEquip(): void;

	ServerDequip(): void;

	ServerRemoved(): void;

	SetPredictedState(): void;
}
