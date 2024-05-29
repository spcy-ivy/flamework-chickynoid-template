import Signal from "@rbxts/signal";
import PlayerRecord from "types/chickynoid/PlayerRecord";

declare enum FpsMode {
	Uncapped,
	Hybrid,
	Fixed60,
}

declare interface ServerConfig {
	/** Theoretical max, use a byte for player id */
	maxPlayers: number;
	fpsMode: FpsMode;
	serverHz: number;
	antiWarp: boolean;
}

/** @server */
interface ServerModule {
	config: ServerConfig;
	playerRecords: Map<number, PlayerRecord>;
	startTime: number;
	slots: number[];
	serverStepTimer: number;
	serverSimulationTime: number;
	framesPerSecond: number;
	accumulatedTime: number;
	playerSize: Vector3;
	flags: {
		DEBUG_ANTILAG: boolean;
	};

	OnPlayerSpawn: Signal<(playerRecord: PlayerRecord) => void>;
	OnPlayerDespawn: Signal<(playerRecord: PlayerRecord) => void>;
	OnBeforePlayerSpawn: Signal<(playerRecord: PlayerRecord) => void>;
	OnPlayerConnected: Signal<(server: typeof ServerModule, playerRecord: PlayerRecord) => void>; // FIXME: This type is cursed

	/** Creates connections so that Chickynoid can run on the server. */
	Setup(): void;

	RecreateCollisions(root: Instance): void;

	GetPlayerByUserId(userId: number): PlayerRecord | undefined;

	GetPlayers(): Map<number, PlayerRecord>;

	RegisterMod(mod: ModuleScript): void;

	AddConnection(
		userId: number,
		player: Player | undefined,
	): PlayerRecord;
}

declare const ServerModule: ServerModule

export = ServerModule
