import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import type { Link as LinkType } from "@/lib/types/link-type";

const allowedCharRegex = /^[a-zA-Z0-9-_]+$/;

export const urlValidationSchema = z.object({
  original_url: z.string().url({ message: "Url is not a string" }),
  shorten_url: z
    .string()
    .min(6, { message: "minimum character is 6" })
    .max(32, { message: "maximum character is 32" })
    .refine((alias) => allowedCharRegex.test(alias), {
      message:
        "only alphanumeric, hyphen (-) and underscores characters allowed, please change it",
    })
    .refine(
      async (alias) => {
        await prisma.$connect();
        const checkAlias = await prisma.link.findFirst({
          where: {
            shorten_url: alias,
          },
        });
        await prisma.$disconnect();

        if (checkAlias) {
          return false;
        } else {
          return true;
        }
      },
      { message: "Alias already exist" },
    ),
});

export async function validateUrl(props: LinkType) {
  const validate = await urlValidationSchema.safeParseAsync(props);
  if (!validate.success) {
    return {
      status: false,
      error: validate.error?.flatten().fieldErrors,
    };
  } else {
    return {
      status: true,
      data: validate.data,
    };
  }
}
