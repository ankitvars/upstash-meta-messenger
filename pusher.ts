/* eslint-disable @typescript-eslint/no-unused-vars */
import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1871784",
  key: "b59e9be6cbc1dfa60ad9",
  secret: "4180609c5cc4db353d27",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("b59e9be6cbc1dfa60ad9", {
  cluster: "ap2",
  forceTLS: true,
});
