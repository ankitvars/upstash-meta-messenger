import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export default redis;
// await client.set("foo", "bar");
