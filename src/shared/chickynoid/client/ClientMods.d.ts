/** @client */
interface ClientMods {
	RegisterMods(
		scope: "clientmods" | "characters" | "weapons",
		folder: Instance,
	): void;

	RegisterMod(
		scope: "clientmods" | "characters" | "weapons",
		mod: ModuleScript,
	): void;
}

declare const ClientMods: ClientMods
export = ClientMods
