import express, { Request, Response } from "express";
import { db } from "./firebase.config";
import ChatStorageController from "./ChatStorageController";

const app = express();
const port = 3000;

const chatStorage = new ChatStorageController();

app.get("/", async (req: Request, res: Response) => {
  chatStorage.newChat({ author: "+75985641254" });

  res.send("OK");
});

app.get("/all", async (req: Request, res: Response) => {
  const docRef = await db.collection("users").listDocuments();

  console.log(docRef);

  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
