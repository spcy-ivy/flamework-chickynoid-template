import CharacterData from "shared/chickynoid/Simulation/CharacterData";
import Simulation from "../../../chickynoid/types/Simulation";

interface ClientChickynoid {
	simulation: Simulation;
	ping: number;

	GetPlayerDataByUserId(userId: number): CharacterData;
}

interface ClientChickynoidConstructor {
	/**
	 * Constructed internally. Do not use directly.
	 * @private
	 */
	new (): ClientChickynoid;
}

declare const ClientChickynoid: ClientChickynoidConstructor;
export = ClientChickynoid;
