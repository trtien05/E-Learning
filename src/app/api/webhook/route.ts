import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET is not set')
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let msg: WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }

  console.log(msg);
  const eventType = msg.type;
  if (eventType === "user.created") {
    //create user to database
    console.log(msg.data)
  }

  // Rest

  return new Response("OK", { status: 200 });
}

//A webhook is a mechanism that allows one application to provide real - time information to other applications when a specific event occurs.Instead of requiring the second application to constantly check(poll) the first application for data, a webhook enables the first application to automatically send data or notifications to the second application when the event happens.