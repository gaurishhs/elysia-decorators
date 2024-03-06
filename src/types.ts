import { HTTPMethod, LocalHook, InputSchema } from "elysia";

interface Container {
    get(identifier: string | symbol): Function;
}

export interface ControllersLoaderOptions {
    controllers: Function[] | string[];
    container?: Container;
}

export const SupportedMethodFunctions = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'custom'];

export interface Hook extends LocalHook<InputSchema, any, any, any, InputSchema, any> {}
export interface Config {
  config: {
    allowMeta?: boolean
  }
}
export interface RouteOptions extends Hook, Partial<Config> {}

export interface ElysiaRoute {
    method: HTTPMethod;
    path: string;
    methodName: string | symbol;
    options?: RouteOptions,
}