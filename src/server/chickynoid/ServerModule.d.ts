import Signal from "@rbxts/signal";
import PlayerRecord from "types/chickynoid/PlayerRecord";

/** @server */
export namespace ServerModule {
	export interface ServerConfig {
		/** Theoretical max, use a byte for player id */
		maxPlayers: number;
		fpsMode: FpsMode;
		serverHz: number;
		antiWarp: boolean;
	}

	export const enum FpsMode {
		Uncapped,
		Hybrid,
		Fixed60,
	}

	export let config: ServerConfig;
	export const playerRecords: Map<number, PlayerRecord>;
	export const startTime: number;
	export const slots: number[];
	export const serverStepTimer: number;
	export const serverSimulationTime: number;
	export const framesPerSecond: number;
	export const accumulatedTime: number;
	export const playerSize: Vector3;
	export const flags: {
		DEBUG_ANTILAG: boolean;
	};

	export const OnPlayerSpawn: Signal<(playerRecord: PlayerRecord) => void>;
	export const OnPlayerDespawn: Signal<(playerRecord: PlayerRecord) => void>;
	export const OnBeforePlayerSpawn: Signal<(playerRecord: PlayerRecord) => void>;
	export const OnPlayerConnected: Signal<(server: typeof ServerModule, playerRecord: PlayerRecord) => void>; // FIXME: This type is cursed

	/** Creates connections so that Chickynoid can run on the server. */
	export function Setup(this: typeof ServerModule): void;

	export function RecreateCollisions(this: typeof ServerModule, root: Instance): void;

	export function GetPlayerByUserId(this: typeof ServerModule, userId: number): PlayerRecord | undefined;

	export function GetPlayers(this: typeof ServerModule): Map<number, PlayerRecord>;

	export function RegisterMod(this: typeof ServerModule, mod: ModuleScript): void;

	export function AddConnection(
		this: typeof ServerModule,
		userId: number,
		player: Player | undefined,
	): PlayerRecord;
}
