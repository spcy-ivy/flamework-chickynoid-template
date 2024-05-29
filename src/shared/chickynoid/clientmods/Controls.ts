import { Controller } from "@flamework/core";
import { Players, RunService, StarterGui, UserInputService, Workspace } from "@rbxts/services";
import { ClientMod } from "types/chickynoid/ClientMod";

interface ControlsProperties {
	shiftlock: number;
	resetRequested: boolean;
	CalculateRawMoveVector(cameraRelativeMoveVector: Vector3): Vector3;
}

interface Command {
	x: number;
	y: number;
	z: number;
	reset: boolean;
}

interface ControlModule {
	GetMoveVector(): Vector3;
}

// worst. code. ever.
const controlModule = require(Players.LocalPlayer.WaitForChild("PlayerScripts")
	.WaitForChild("PlayerModule")
	.WaitForChild("ControlModule") as ModuleScript) as ControlModule;

export = {
	shiftlock: 0,
	resetRequested: false,

	CalculateRawMoveVector(cameraRelativeMoveVector: Vector3) {
		// can we just assume this exists
		//                                     VVVVVVVVV
		const camera = Workspace.CurrentCamera as Camera;
		const yaw = camera.CFrame.ToEulerAnglesYXZ()[1];
		return CFrame.fromEulerAnglesYXZ(0, yaw, 0).mul(
			new Vector3(cameraRelativeMoveVector.X, 0, cameraRelativeMoveVector.Z),
		);
	},

	Setup() {
		UserInputService.GetPropertyChangedSignal("MouseBehavior").Connect(() => {
			this.shiftlock = UserInputService.MouseBehavior === Enum.MouseBehavior.Default ? 0 : 1;
		});

		const resetBindable = new Instance("BindableEvent");
		resetBindable.Event.Connect(() => (this.resetRequested = true));

		for (let retries = 0; retries < 8; retries++) {
			const [result, err] = pcall(() => StarterGui.SetCore("ResetButtonCallback", resetBindable));

			if (result) break;

			RunService.Stepped.Wait();
		}
	},

	Step() {},

	GenerateCommand(command: Command, serverTime: number, deltatime: number): Command {
		command.x = 0;
		command.y = 0;
		command.z = 0;

		let moveVector = controlModule.GetMoveVector();
		if (moveVector.Magnitude > 0) {
			moveVector = moveVector.Unit;
			command.x = moveVector.X;
			command.y = moveVector.Y;
			command.z = moveVector.Z;
		}

		if (!UserInputService.GetFocusedTextBox()) {
			const jump = UserInputService.IsKeyDown(Enum.KeyCode.Space)
			command.y = 0
			if (jump) command.y = 1
		}

		const rawMoveVector = this.CalculateRawMoveVector(new Vector3(command.x, 0, command.z));
		command.x = rawMoveVector.X;
		command.z = rawMoveVector.Z;

		if (this.resetRequested) {
			command.reset = true;
			this.resetRequested = false;
		}

		return command;
	},
} as ClientMod & ControlsProperties;
