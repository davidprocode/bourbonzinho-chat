import { create, Message, SocketState, Whatsapp } from "venom-bot";
import ChatStorageController from "./ChatStorageController";

export enum CLIENT_STATUS {
  CONNECTED = "CONNECTED",
  NEVER_CONNECTED = "NEVER_CONNECTED",
  NOT_CONNECTED = "NOT_CONNECTED",
  CONNECTING = "CONNECTING",
}

export class ChatController {
  getSocketStatus() {
    return this.session?.onStateChange((state) => state);
  }
  status: CLIENT_STATUS = CLIENT_STATUS.NEVER_CONNECTED;
  session?: Whatsapp;

  lastMessages(): Object {
    return {};
  }

  handleMessage(message: Message): void {
    if (!message.isGroupMsg || !message.isMedia) {
      ChatStorageController.onChat({
        id: message.id,
        author: message.sender.id ?? message.author,
        authorName: message.sender.formattedName ?? message.notifyName,
        profilePicThumbObj: message.sender.profilePicThumbObj.eurl,
        content: message.content,
        chat: message.chat,
        raw: message,
      });
    }
  }

  start() {
    this.status = CLIENT_STATUS.CONNECTING;
    if (!this.session) {
      create({ debug: true, session: "Bourbonzinho" })
        .then((client) => {
          this.status = CLIENT_STATUS.CONNECTED;
          this.session = client;
          this.session.onMessage((message) => this.handleMessage(message));
          return this.session;
        })
        .catch(() => {
          this.status = CLIENT_STATUS.NOT_CONNECTED;
        });
    }
  }
}
