# Decorators Plugin

This plugin provides decorator-based routing support to elysia.

Install with:

    ```bash
    bun add elysia-decorators
    ```

Then use it:

```ts
import { Controller, Get, decorators } from "elysia-decorators";
import { Elysia } from "elysia";

// /users prefix
@Controller("/users/")
class UsersController {
  @Get()
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

The above code will create a route at `/users/` which will return `Hello World` when a `GET` request is made to it.

---

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

---

### License

This project is licensed under the MIT License - see the LICENSE file for details