import Simulation from "../shared/Simulation/Simulation";

export interface CharacterMod {
	Setup(simulation: Simulation): void;
	GetCharacterModel(userId: number): Model | undefined;
}
