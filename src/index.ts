import "./boot";

import { app } from "./app";
import { configs } from "./helpers/configs";

app.listen(configs.HTTP_PORT, () =>
  console.log(`server running on ${configs.HTTP_PORT}`)
);
