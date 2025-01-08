import { Whatsapp } from "venom-bot";

enum CLIENT_STATUS {
  "CONNECTED",
  "NEVER_CONNECTED",
}

class ChatController {
  session!: Whatsapp;
  status: CLIENT_STATUS = CLIENT_STATUS.NEVER_CONNECTED;
  start(client: Whatsapp) {
    if (this.session!) {
      this.session = client;
      this.status = CLIENT_STATUS.CONNECTED;
    }
  }
}
export const chatController = new ChatController();
