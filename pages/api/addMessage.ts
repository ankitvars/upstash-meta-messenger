// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import redis from "@/redis";
import { Message } from "@/typings";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: Message;
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method not allowed" });
    return;
  }

  const { message } = req.body;

  const newMessage = {
    ...message,
    created_at: Date.now(),
  };

  // push to upstash redis db
  await redis.hset("messages", message.id, JSON.stringify(newMessage));
  res.status(200).json({ message: newMessage });
}
