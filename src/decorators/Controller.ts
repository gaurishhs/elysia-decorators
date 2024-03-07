export const Controller = (prefix = ''): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata('prefix', prefix, target)

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
  }
}
