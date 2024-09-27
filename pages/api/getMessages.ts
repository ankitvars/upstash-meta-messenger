// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import redis from "@/redis";
import { Message } from "@/typings";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  messages: Message[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method not allowed" });
    return;
  }

  const messages = await redis.hvals("messages");
  const parsedMessages: Message[] = messages
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  res.status(200).json({ messages: parsedMessages });
}
