import { db } from "./firebase.config";

type Chat = {
  id: String;
  author: String;
  messages: [Message];
};

type Message = {
  id: String;
  body: String;
  timestamp: String;
};

export default class ChatStorageController {
  constructor() {}

  newChat(chat: Chat) {
    console.log(`Log: New Chat With:`);
    console.log(chat);
    
  }
}
