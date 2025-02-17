import http from "http"
import connectDB from "./db/connectDB";

import app from './app/app'; // Ensure app.js has "export default"

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    connectDB()
    console.log(`http://localhost:${PORT}`);
});
