import { HTTPMethod, LocalHook, InputSchema, DecoratorBase, DefinitionBase, RouteSchema, UnwrapRoute, MergeSchema } from "elysia";

interface Container {
    get(identifier: string | symbol): Function;
}

interface Definitions extends DefinitionBase {
  type: {};
  error: {};
}

interface Decorators extends DecoratorBase {
  request: {};
  store: {};
  derive: {};
  resolve: {};
}

interface ParentSchema extends RouteSchema {}
interface Macro extends Record<string, unknown> {}
interface LocalSchema extends InputSchema<keyof Definitions['type'] & string> {}
interface Route extends MergeSchema<UnwrapRoute<LocalSchema, Definitions['type']>, ParentSchema> {}

export interface ControllersLoaderOptions {
    controllers: Function[] | string[];
    container?: Container;
}

export interface Hook extends LocalHook<LocalSchema, Route, Decorators, Definitions['error'], Macro, any> {}
export interface Config {
  config: {
    allowMeta?: boolean
  }
}

export interface RouteOptions extends Hook, Config {}

export interface ElysiaRoute {
    method: HTTPMethod;
    path: string;
    methodName: string | symbol;
    options?: RouteOptions,
}