interface ReplicatedStorage {
	TS: Folder & {
		chickynoid: Folder & {
			characters: Folder;
			clientmods: Folder;
		};
	};
}

interface ServerScriptService {
	TS: Folder & {
		chickynoid: Folder & {
			servermods: Folder;
		};
	};
}
