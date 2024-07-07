"use server";

import { prisma } from "@/lib/db/prisma";
import { validateUrl } from "@/lib/validation/urlValidation";

interface AcceptedValue {
  url: string | null;
  alias: string | null;
}

interface ErrorValue {
  url: string[] | null;
  alias: string[] | null;
  general_error: string[] | null;
}

export interface InitialValue extends AcceptedValue {
  error: ErrorValue | null;
}

export async function shorteningURLAction(
  initialValue: InitialValue,
  formData: FormData,
) {
  const url = formData.get("url");
  const alias = formData.get("alias");

  // validate
  const validate = await validateUrl({
    url: url as string,
    alias: alias as string,
  });

  let returnedValue: AcceptedValue | null = null;
  let errorValue: ErrorValue | null = null;

  if (!validate.status) {
    errorValue = {
      url: validate.error?.url as string[],
      alias: validate.error?.alias as string[],
      general_error: null,
    };

    return {
      url: null,
      alias: null,
      error: errorValue,
    };
  }

  // post data
  try {
    await prisma.$connect();
    const createNewShorten = await prisma.link.create({
      data: {
        original_url: url as string,
        shorten_url: alias as string,
      },
    });

    returnedValue = {
      url: createNewShorten.original_url,
      alias: `${process.env.NEXT_PUBLIC_APP_URL}/${createNewShorten.shorten_url}`,
    };
  } catch (e) {
    console.error("ERROR WHEN SHORTENING URL");
    console.error(e);
    errorValue = {
      url: null,
      alias: null,
      general_error: ["Something went wrong, try again later."],
    };
  } finally {
    await prisma.$disconnect();
  }

  return {
    url: returnedValue?.url!,
    alias: returnedValue?.alias!,
    error: errorValue == null ? null : errorValue,
  } satisfies InitialValue;
}
