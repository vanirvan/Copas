import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

interface GETParams {
  params: { shorten: string };
}

export async function GET(req: NextRequest, { params }: GETParams) {
  await prisma.$connect();
  const getLink = await prisma.link.findFirst({
    where: {
      shorten_url: params.shorten,
    },
  });
  await prisma.$disconnect();

  if (getLink) {
    return NextResponse.redirect(getLink.original_url);
  } else {
    return NextResponse.json(
      {
        error: "URL not found",
      },
      {
        status: 404,
      },
    );
  }
}
