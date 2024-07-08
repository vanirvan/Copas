"use server";

import { prisma } from "../db/prisma";

export async function deleteShortenAction(
  data: void | null,
  formData: FormData,
) {
  const shorten_url = formData.get("shorten_url");
  const getAlias = shorten_url?.toString().split("/")!;

  await prisma.$connect();
  await prisma.link.delete({
    where: {
      shorten_url: getAlias[getAlias.length - 1],
    },
  });
  await prisma.$disconnect();
}
