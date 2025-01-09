import express, { Request, Response } from "express";
import { db } from "./firebase.config";
import { ChatController, CLIENT_STATUS } from "./chatController";

const chatController = new ChatController();
const app = express();
const port = 3001;

app.get("/start", async (req: Request, res: Response) => {
  if (
    chatController.status !== CLIENT_STATUS.CONNECTED ||
    CLIENT_STATUS.CONNECTING
  ) {
    await chatController.start();
    res.send({ status: CLIENT_STATUS.CONNECTING });
  }
  if (chatController.status === CLIENT_STATUS.CONNECTED) {
    res.send({ status: CLIENT_STATUS.CONNECTED });
  }
});

app.get("/status/server", async (req: Request, res: Response) => {
  res.send({ status: chatController.status });
});
app.get("/status/socket", async (req: Request, res: Response) => {
  res.send({ status: chatController.getSocketStatus() });
});

app.get("/last", async (req: Request, res: Response) => {
  res.send(chatController.lastMessages());
});

app.get("/all", async (req: Request, res: Response) => {
  const docRef = await db.collection("users").listDocuments();
  res.send("OK");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
