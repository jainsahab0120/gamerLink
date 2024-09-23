//@ts-nocheck
import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerPayload = headers();

  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return NextResponse.json(
      { msg: "No authorization header" },
      { status: 400 }
    );
  }

  const event = await receiver.receive(body, authorization);

  if (event.event === "ingress_started") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }

  return NextResponse.json({ msg: "Done Successfully" }, { status: 200 });
}
