# elysia-decorators

![badge](https://github.com/gaurishhs/elysia-decorators/actions/workflows/npm-publish.yml/badge.svg)

- This plugin adds decorator and controller-based routing support to elysia.

> **Note:**
> You need to enable [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) compiler option for this plugin to work.

Please consider starring the project to show your ❤️ and support.

## Installation

Requires Bun v1.0.14 when using file-based controllers due to dependence on `Bun.Glob` introduced in v1.0.14.

```bash
bun add elysia-decorators
```

## Example

- [Demo](https://github.com/gaurishhs/elysia-controllers/tree/main/demo)

```ts
import { Controller, Get, decorators } from "elysia-decorators";
import { Elysia } from "elysia";

// /users prefix
@Controller("/users/")
class UsersController {
  @Get("")
  index() {
    return "Hello World";
  }
}

const app = new Elysia();

app.use(
  decorators({
    controllers: [UsersController],
  })
);

app.listen(3000);
```

## Documentation 

Note: When using File-based controllers Bun v1.0.14 or more is required since it depends on `Bun.Glob`

### Controller Decorator

The `Controller` decorator is used to mark a class as a controller. It takes a string as an argument which is the prefix for all the routes in that controller. The prefix can be empty.

```ts
@Controller("/users/")
class UsersController {
  // ...
}
```


---

### Method Decorators

The method decorators are used to mark a method as a route. They take a string as an argument which is the path for the route. The path can be empty.

```ts
@Controller("/users/")
class UsersController {
  @Get()
  index() {
    // ...
  }
}
```

The above code will create a route at `/users/` which will respond to `GET` requests.

---

### Custom Decorator 

You can use a custom method as well by using the `Custom` decorator. 

```ts
@Controller("/users/")
class UsersController {
  @Custom("M-SEARCH", "/")
  index() {
    // ...
  }
}
```

The above code will create a route at `/users/` which will respond to `M-SEARCH` requests.

## License

- This project is licensed under the MIT License - see the LICENSE file for details
