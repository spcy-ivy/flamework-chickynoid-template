import Signal from "@rbxts/signal";
import CharacterModel from "./CharacterModel";
import ClientChickynoid from "./ClientChickynoid";
import { WeaponsClient } from "./WeaponsClient";
import CharacterRecord from "types/chickynoid/CharacterRecord";
import ClientMods from "./ClientMods";

declare interface ClientConfig {
	/** If you're slower than this, your step will be broken up. */
	fpsMin: number;
	/** Think carefully about changing this! Every extra frame clients make, puts load on the server. */
	fpsMax: number;

	useSubFrameInterpolation: boolean;
	/** Show movement debug in FPS graph. */
	showDebugMovement: boolean;
}

/** @client */
interface ClientModule {
	config: ClientConfig;

	fpsMax: number;
	fpsMin: number;
	fpsIsCapped: boolean;
	interpolationBuffer: number;

	characterModel: CharacterModel | undefined;
	estimatedServerTime: number;
	estimatedServerTimeOffset: number;
	startTime: number;
	weaponsClient: typeof WeaponsClient;

	OnNetworkEvent: Signal<(event: unknown) => void>;
	OnCharacterModelCreated: Signal<(characterModel: CharacterModel) => void>;
	OnCharacterModelDestroyed: Signal<(characterModel: CharacterModel) => void>;

	flags: {
		HANDLE_CAMERA: boolean;
	};
	/**
	 * Creates connections so that Chickynoid can run on the client. Specifically, it connects to relevant networking and
	 * RunService events.
	 */
	Setup(this: typeof ClientModule): void;

	/**
	 * Map of userId to CharacterRecord.
	 */
	GetCharacters(): Map<number, CharacterRecord>;

	RegisterMod(mod: ModuleScript): void;

	GetClientChickynoid(): ClientChickynoid;

	DebugMarkAllPlayers(text: string): void;

	/** Set a callback for custom models. */
	SetCharacterModel(callback: (userId: number) => Model | undefined): void;
}

declare const ClientModule: ClientModule;
export = ClientModule;
