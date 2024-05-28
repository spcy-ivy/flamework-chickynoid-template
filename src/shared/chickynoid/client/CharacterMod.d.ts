import Simulation from "../../../chickynoid/types/Simulation";

export interface CharacterMod {
	Setup(simulation: Simulation): void;
	GetCharacterModel(userId: number): Model | undefined;
}
