import "./boot";

import { app } from "./app";
import { configs } from "./helpers/configs";
import { database } from "./helpers/database";

database
  .initialize()
  .then(() => {
    app.listen(configs.HTTP_PORT, () =>
      console.log(`server running on ${configs.HTTP_PORT}`)
    );
  })
  .catch((error) => {
    console.log("error to connect on database");
    console.log(error);
  });
