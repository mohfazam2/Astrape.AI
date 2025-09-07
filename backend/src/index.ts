import express from "express";
import { mainRouter } from "./Routes/index.js"
import cors from "cors";




const app = express();
app.use(cors());

app.use(express.json());

app.get("/Health", (req, res) => {
    res.status(200).json({
        Message: "Index Route Working Fine"
    });
});

app.use("/api/v1", mainRouter);



app.listen(4000, () => {
    console.log("Server Started at port 4000");
});