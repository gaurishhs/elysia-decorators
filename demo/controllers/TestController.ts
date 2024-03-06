import { Controller } from "../../src";
import { Get } from "../../src";
import { t } from "elysia";

@Controller()
export class TestController {
    @Get('/', {
        body: t.Object({
            abc: t.String()
        })
    })
    public index({ query }: { query: { name: string } }) {
        return 'Hello ' + query.name;
    }
}