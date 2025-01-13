import express, { Request, Response } from "express";
import { ChatController, CLIENT_STATUS } from "./chatController";

const chatController = new ChatController();
const app = express();
const port = 3000;

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

app.get("/status", async (req: Request, res: Response) => {
  res.send({
    status: {
      server: chatController.status,
      socket: await chatController.getSocketStatus(),
    },
  });
});

app.get("/messages", async (req: Request, res: Response) => {
  res.send(await chatController.getAllMessagesPretty());
});

app.get("/messages/raw", async (req: Request, res: Response) => {
  res.send(await chatController.getAllMessages());
});

app.get("/messages/raw/last", async (req: Request, res: Response) => {
  res.send(await chatController.getLastMessages());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
