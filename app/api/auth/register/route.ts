import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { z } from "zod";
import { hash } from "bcryptjs";

const registerSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = registerSchema.parse(body);
  if (parsed) {
    const userPresent = await db.user.findFirst({
      where: {
        email: body.email,
        username: body.username,
      },
    });

    if (userPresent)
      return NextResponse.json({ msg: "User Already Exists" }, { status: 400 });
    const pwd = await hash(body.password, 10);
    const user = await db.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: pwd,
        stream: {
          create: {
            name: `${body.username}'s stream`,
          },
        },
      },
    });
    if (user) {
      return NextResponse.json(
        { msg: "User Created Successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json({ msg: "Data is invalid!" }, { status: 400 });
  } else {
    return NextResponse.json({ msg: "Data is Invalid" }, { status: 400 });
  }
}
