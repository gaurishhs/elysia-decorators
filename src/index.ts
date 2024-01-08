import type { Elysia } from "elysia";
import { ControllerManager } from "./ControllerManager";
import type { ControllersLoaderOptions } from "./types";

export const decorators = (options: ControllersLoaderOptions) => (app: Elysia) => new ControllerManager(options).load(app);

export * from './decorators/Controller';
export * from './decorators/Factory';
