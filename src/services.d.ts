interface ReplicatedStorage {
	TS: Folder & {
		chickynoid: Folder & {
			characters: Folder;
			clientmods: Folder;
		};
	};
	assets: Folder & {
		chickynoid: Folder & {
			R15Rig: Model,
			Effects: Folder
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
