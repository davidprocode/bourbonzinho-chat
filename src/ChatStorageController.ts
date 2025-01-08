import { db } from "./firebase.config";


type Chat = {
  author: String;
};

export default class ChatStorageController {
  constructor() {}

  newChat(chat: Chat) {
    console.log(`Log: New Chat`);
  }
}
