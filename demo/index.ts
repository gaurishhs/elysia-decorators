/**
 * @IMPORTANT: Requires Glob to be installed, run `bun add glob` to install
 */

import Elysia from "elysia";
import { decorators } from "../src";

const app = new Elysia();

app.use(
    decorators({
        controllers: [__dirname + "/controllers/*.ts"],
    })
);


app.listen(3000)