"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Dice5Icon } from "lucide-react";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shorteningURLAction } from "@/lib/actions/shorteningURLAction";
import type { Link as LinkType } from "@/lib/types/link-type";

export function ShortenForm() {
  const [formState, setFormState] = useState<LinkType>({
    original_url: "",
    shorten_url: "",
  });

  const [state, action] = useFormState(shorteningURLAction, {
    original_url: "",
    shorten_url: "",
    error: null,
  });

  const [links, setLinks, removeLinks] = useLocalStorage<LinkType[]>(
    "copas-links",
    [],
  );
  const [copiedLink, copyLinkFn] = useCopyToClipboard();

  const randomizeAlias = () => {
    const generate = nanoid(10);
    setFormState((prev) => ({ ...prev, shorten_url: generate }));
  };

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    formData.append("original_url", formState.original_url);
    formData.append("shorten_url", formState.shorten_url);

    setDisableSubmitButton(true);

    action(formData);
  };

  const [disableSubmitButton, setDisableSubmitButton] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (state.original_url !== "" && state.shorten_url !== "") {
        setLinks((prev) => [
          {
            original_url: state.original_url!,
            shorten_url: state.shorten_url!,
          },
          ...prev,
        ]);

        toast.success("New Shorten URL has been created!", {
          description: state.shorten_url,
          action: {
            label: "Copy",
            onClick: () =>
              copyLinkFn(
                `${process.env.NEXT_PUBLIC_APP_URL}/${state.shorten_url}`,
              ),
          },
        });
      }
      setDisableSubmitButton(false);
    }
  }, [state, setLinks, copyLinkFn]);

  return (
    <Card className="w-full max-w-lg bg-background-light-100 shadow-2xl shadow-primary-light-500 dark:border-background-dark-500 dark:bg-background-dark-600 dark:shadow-primary-dark-500">
      <CardContent className="space-y-4 p-6">
        <form
          id="shorten-form"
          onSubmit={_onSubmit}
          className="flex flex-col gap-8"
        >
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="original_url"
              placeholder="Enter your URL"
              required
              value={formState.original_url}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  original_url: e.target.value,
                }))
              }
              className="bg-background-light-100 dark:bg-background-dark-700"
            />
            <p className="text-sm font-light text-red-500">
              {state.error?.original_url}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="alias">Alias</Label>
            <Input
              id="alias"
              name="shorten_url"
              placeholder="Enter an alias (optional)"
              maxLength={32}
              required
              value={formState.shorten_url}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  shorten_url: e.target.value,
                }))
              }
              className="bg-background-light-100 dark:bg-background-dark-700"
            />
            <p className="text-sm font-light text-red-500">
              {state.error?.shorten_url}
            </p>
            <p className="break-words text-sm font-light text-neutral-400">
              Your url would be {process.env.NEXT_PUBLIC_APP_URL}/
              {formState.shorten_url}
            </p>
          </div>
        </form>
        <p className="text-sm font-light text-red-500">
          {state.error?.general_error}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-end gap-4">
          <Button
            type="button"
            disabled={disableSubmitButton}
            onClick={() => randomizeAlias()}
            className="flex items-center gap-2 bg-accent-light-500 hover:bg-accent-light-400 dark:bg-accent-light-500 dark:text-white hover:dark:bg-accent-dark-400"
          >
            <Dice5Icon size={16} />
            Randomize Alias
          </Button>
          <Button
            type="submit"
            form="shorten-form"
            disabled={disableSubmitButton}
            className="bg-primary-light-500 hover:bg-primary-light-400 dark:bg-primary-dark-600 dark:text-white hover:dark:bg-primary-dark-500"
          >
            Shorten
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
