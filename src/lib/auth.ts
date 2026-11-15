import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins/jwt";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("event-management");

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [
    jwt({
      jwks: {
        keyPairConfig: { alg: "EdDSA" },
      },
      jwt: {
        issuer: process.env.NEXT_PUBLIC_BASE_URL,
        audience: "community-events-api",
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
});