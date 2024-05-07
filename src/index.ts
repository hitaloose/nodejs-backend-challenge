import "./boot";

import { app } from "./app";
import { configs } from "./helpers/configs";
import { database } from "./helpers/database";

const listenHttp = () => {
  app.listen(configs.HTTP_PORT, () =>
    console.log(`server running on ${configs.HTTP_PORT}`)
  );
};

if (configs.REPO_IMPL === "typeorm") {
  database
    .initialize()
    .then(() => {
      listenHttp();
    })
    .catch((error) => {
      console.log("error to connect on database");
      console.log(error);
    });
}

if (configs.REPO_IMPL === "in_memory") {
  listenHttp();
}
