import { HTTPMethod } from 'elysia'
import { ElysiaRoute, RouteOptions } from '../types'

const getMethodFunction = (
  method: HTTPMethod,
  path: string,
  options?: RouteOptions
) => {
  return (target: any, propertyKey: any): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata(
      'routes',
      target.constructor
    ) as Array<ElysiaRoute>
    if (!propertyKey) throw new Error('Consider adding a method for the route')
    routes.push({
      path,
      method,
      methodName: propertyKey,
      options,
    })

    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

const createRouteMethod = (method: string) => (path = '/', {config, ...hook}: RouteOptions = {config: {allowMeta: false}}) => getMethodFunction(method, path, {config, ...hook});

export const Get = createRouteMethod('GET');
export const Post = createRouteMethod('POST');
export const Put = createRouteMethod('PUT');
export const Delete = createRouteMethod('DELETE');
export const Patch = createRouteMethod('PATCH');
export const Head = createRouteMethod('HEAD');
export const Options = createRouteMethod('OPTIONS');

export const Custom = (method: string, path: string, {config, ...hook}: RouteOptions = {config: {allowMeta: false}}) => getMethodFunction(method, path, {config, ...hook});


  