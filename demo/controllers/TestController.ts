import { Controller, Get } from '../../src';
import { t } from 'elysia';

@Controller()
export class TestController {
    @Get('/', {
      config: { allowMeta: true },
      query: t.Object({
        name: t.String(),
      }),
    })
    hello({ query }: { query: { name: string } }) {
      return 'Hello ' + query.name;
    }

    @Get('bye')
    bye() {
      return 'Bye';
    }
}