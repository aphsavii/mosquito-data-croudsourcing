import {dbConnect} from "./connections/dbConnect.js";
import { app } from "./index.js";


dbConnect().then(() => {
    app.listen(process.env.APP_PORT || 5000, () =>
      console.log("App is running on port", process.env.APP_PORT)
    );
  })
  .catch((err) => console.log("connection failed", err?.message));
 