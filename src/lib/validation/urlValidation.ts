import { z } from "zod";
import { prisma } from "../db/prisma";

const allowedCharRegex = /^[a-zA-Z0-9-_]+$/;

export const urlValidationSchema = z.object({
  url: z.string().url({ message: "Url is not a string" }),
  alias: z
    .string()
    .min(6, { message: "minimum character is 6" })
    .max(32, { message: "maximum character is 16" })
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

type UrlValidationProps = z.infer<typeof urlValidationSchema>;

type ValidateFunctionReturnType =
  | {
      status: true;
      data: UrlValidationProps;
    }
  | {
      status: false;
      error:
        | {
            url?: string[] | undefined;
            alias?: string[] | undefined;
          }
        | undefined;
    };

export async function validateUrl(
  props: UrlValidationProps,
): Promise<ValidateFunctionReturnType> {
  const validate = await urlValidationSchema.safeParseAsync(props);
  console.log(validate);

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
