"use server";

import { prisma } from "@/lib/db/prisma";
import { validateUrl } from "@/lib/validation/urlValidation";
import type {
  Link as LinkType,
  LinkError as LinkErrorType,
} from "@/lib/types/link-type";

type InitialValue = LinkType & {
  error: ErrorMessage | null;
};

type ErrorMessage = LinkErrorType & {
  general_error: string[];
};

export async function shorteningURLAction(
  initialValue: InitialValue,
  formData: FormData,
) {
  const original_url = formData.get("original_url") as string;
  const shorten_url = formData.get("shorten_url") as string;

  // validate
  const validate = await validateUrl({ original_url, shorten_url });

  if (!validate.status) {
    return {
      original_url: "",
      shorten_url: "",
      error: {
        original_url: validate.error?.original_url
          ? (validate.error.original_url as string[])
          : [],
        shorten_url: validate.error?.shorten_url
          ? (validate.error.shorten_url as string[])
          : [],
        general_error: [],
      },
    } satisfies InitialValue;
  }

  // post data
  try {
    await prisma.$connect();
    const createNewLink = await prisma.link.create({
      data: {
        original_url,
        shorten_url,
      },
    });

    return {
      original_url: createNewLink.original_url,
      shorten_url: createNewLink.shorten_url,
      error: null,
    } satisfies InitialValue;
  } catch (e) {
    console.error("ERROR WHEN SHORTENING URL");
    console.error(e);
    return {
      original_url: "",
      shorten_url: "",
      error: {
        original_url: [],
        shorten_url: [],
        general_error: ["Something went wrong, try again later."],
      },
    } satisfies InitialValue;
  } finally {
    await prisma.$disconnect();
  }
}
