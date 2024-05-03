import moduleAlias from "module-alias";
import { resolve } from "path";

moduleAlias.addAliases({
  "@": resolve(__dirname, ".."),
  "@test": resolve(__dirname, "..", "..", "test"),
});
