import Signal from "@rbxts/signal";
import ClientModule from "../ClientModule";
import { WeaponModule } from "types/chickynoid/WeaponModule";

/** @client */
export namespace WeaponsClient {
	export let OnBulletImpact: Signal<(client: typeof ClientModule, event: unknown) => void>;

	export function GetWeaponModuleByWeaponId(self: typeof WeaponsClient, weaponId: number): WeaponModule;
}
