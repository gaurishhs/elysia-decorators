import { HTTPMethod, LocalHook } from 'elysia'
import { ElysiaRoute } from '../types'

const getMethodFunction = (
  method: HTTPMethod,
  path: string,
  hook?: LocalHook
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
      hook: hook
    })

    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

export const Get = (path: string, hook?: LocalHook) =>
  getMethodFunction('GET', path, hook)
export const Post = (path: string, hook?: LocalHook) =>
  getMethodFunction('POST', path, hook)
export const Put = (path: string, hook?: LocalHook) =>
  getMethodFunction('PUT', path, hook)
export const Delete = (path: string, hook?: LocalHook) =>
  getMethodFunction('DELETE', path, hook)
export const Patch = (path: string, hook?: LocalHook) =>
  getMethodFunction('PATCH', path, hook)
export const Head = (path: string, hook?: LocalHook) =>
  getMethodFunction('HEAD', path, hook)
export const Options = (path: string, hook?: LocalHook) =>
  getMethodFunction('OPTIONS', path, hook)
export const Custom = (method: HTTPMethod, path: string, hook?: LocalHook) =>
  getMethodFunction(method, path, hook)
