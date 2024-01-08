import Elysia from "elysia";
import { decorators } from "../src";

const app = new Elysia();

app.use(
    decorators({
        controllers: [__dirname + "/controllers/*.ts"],
    })
);


app.listen(3000)