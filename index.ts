import app from "./app"
import {startConnection} from "./database";

startConnection();
startConnection()
app.listen(3000);
console.log('Server is running in port 3000')