import { t } from 'elysia';
import { Controller, Get, Post } from '../../src';

@Controller()
export class TestController {
  @Get('/', {
    config: { allowMeta: false },
    query: t.Object({
      id: t.String(),
    }),
  })
  async hello({ query }: { query: { id: string } }) {
    return 'Hello ' + query.id;
  }

  @Post('/publish', {
    config: { allowMeta: false },
    body: t.Object({
      title: t.String(),
      description: t.String(),
    }),
  })
  async publish({ body }: { body: { title: string; description: string } }) {
    return {
      ...body,
    };
  }
}
