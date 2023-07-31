# elysia-decorators

- This plugin adds decorator and controller-based routing support to elysia.

## Installation

```bash
bun add elysia-decorators
```

## Example

- [Demo](https://github.com/gaurishhs/kingworld-controllers/tree/main/demo)

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

## License

- This project is licensed under the MIT License - see the LICENSE file for details
