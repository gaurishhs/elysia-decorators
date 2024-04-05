import {
  DefinitionBase,
  EphemeralType,
  HTTPMethod,
  InputSchema,
  LocalHook,
  MergeSchema,
  SingletonBase,
  UnwrapRoute,
} from 'elysia';
import { MetadataBase } from 'elysia/types';

interface Container {
  get(identifier: string | symbol): Function;
}

interface Singleton extends SingletonBase {
  decorator: {};
  store: {};
  derive: {};
  resolve: {};
}

interface Definitions extends DefinitionBase {
  type: {};
  error: {};
}

interface Metadata extends MetadataBase {
  schema: {};
  macro: {};
}

interface Ephemeral extends EphemeralType {
  derive: {};
  resolve: {};
  schema: {};
}

interface Volatile extends EphemeralType {
  derive: {};
  resolve: {};
  schema: {};
}

interface LocalSchema extends InputSchema<keyof Definitions['type'] & string> {}
interface Schema
  extends MergeSchema<
    UnwrapRoute<LocalSchema, Definitions['type']>,
    Metadata['schema'] & Ephemeral['schema'] & Volatile['schema']
  > {}

export interface ControllersLoaderOptions {
  controllers: Function[] | string[];
  container?: Container;
}

interface Hook extends LocalHook<LocalSchema, Schema, 
  Singleton & {
    derive: Ephemeral['derive'] & Volatile['derive'];
    resolve: Ephemeral['resolve'] & Volatile['resolve'];
}, Definitions['error'], Metadata['macro'], string> {}

interface Config {
  config: {
    allowMeta?: boolean;
  };
}

export interface RouteOptions extends Hook, Config {}

export interface ElysiaRoute {
  method: HTTPMethod;
  path: string;
  methodName: string | symbol;
  options?: RouteOptions;
}