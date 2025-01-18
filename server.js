import express from "express" 
import { config } from "dotenv"
import { connectDB } from "./config/db.js"
import cors from "cors"
import { errorResponserHandler, invalidPathHandler } from "./middlewares/errorHandler.js"
// Routes
import userRoutes  from "./routes/userRoutes.js"




const app = express()
const port = 5000

config()


// Middleware to parse JSON
app.use(express.json())

app.use(cors());

// A simple route
app.get("/", (req, res) => {
    res.send("Welcome to the server side.")
})


app.use("/api/auth", userRoutes)

app.use(invalidPathHandler);

app.use(errorResponserHandler);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


connectDB();
