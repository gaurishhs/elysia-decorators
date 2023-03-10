import { Controller } from "../../src";
import { Get } from "../../src";
import { t } from "elysia";

@Controller()
export class TestController {
    @Get('/', {
        schema: {
            query: t.Object({
                name: t.String()
            })
        }
    })
    public index() {
        return 'Hello World!';
    }
}