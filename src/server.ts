import app from "./app";
import serverConfig from "./config/config";

app.listen(serverConfig.port, () => {
  console.log(`server is running on port ${serverConfig.port}`);
});
