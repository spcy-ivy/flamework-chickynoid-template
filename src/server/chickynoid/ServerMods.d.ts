/** @server */
interface ServerMods {
	RegisterMods(
		scope: "servermods" | "characters" | "weapons",
		folder: Instance,
	): void;
}

declare const ServerMods: ServerMods
export = ServerMods
