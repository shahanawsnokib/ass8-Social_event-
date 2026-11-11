import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("event-management");

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    sendResetPassword: async ({ user, url }) => {
      // Keep these values in the project-root .env file, never in client code.
      const apiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.RESEND_FROM_EMAIL;

      if (!apiKey || !fromEmail) {
        throw new Error("Set RESEND_API_KEY and RESEND_FROM_EMAIL to send reset emails.");
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [user.email],
          subject: "Reset your Goodturn password",
          text: `Use this link to reset your Goodturn password:\n\n${url}\n\nIf you did not request this, you can ignore this email.`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend failed to send the reset email (${response.status}).`);
      }
    },
  },
});