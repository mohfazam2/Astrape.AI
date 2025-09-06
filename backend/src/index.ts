import express from "express";


const app = express();

app.use(express.json());

app.get("/Health", (req, res) => {
    res.status(200).json({
        Message: "Index Route Working Fine"
    });
});



app.listen(4000, () => {
    console.log("Server Started at port 4000");
});