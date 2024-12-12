import app from "./app.js";

import { dbConnection } from "./database/databaseConnection.js";

const PORT = process.env.PORT || 3002;

dbConnection().then(() => {
    console.log(`Database connected successfully`);
}).then(() => {
    app.listen(PORT, () => {
        console.log(`server is listen on : http://localhost:${PORT}`);
    })
})