import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
    res.send(`hmmmm running on port: ${port} ${process.env.OPENAI_API_KEY}`);

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})