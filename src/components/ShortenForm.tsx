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

interface LocalData {
  original_url: string;
  shorten_url: string;
}

interface FormState {
  url: string;
  alias: string;
}

export function ShortenForm() {
  const [formState, setFormState] = useState<FormState>({ url: "", alias: "" });
  const [state, action] = useFormState(shorteningURLAction, {
    url: "",
    alias: "",
    error: null,
  });

  const [links, setLinks, removeLinks] = useLocalStorage<LocalData[]>(
    "copas-links",
    [],
  );
  const [copiedLink, copyLinkFn] = useCopyToClipboard();

  const randomizeAlias = () => {
    const generate = nanoid(10);
    setFormState((prev) => ({ ...prev, alias: generate }));
  };

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    formData.append("url", formState.url);
    formData.append("alias", formState.alias);

    action(formData);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        state.url !== null &&
        state.url !== "" &&
        state.alias !== null &&
        state.alias !== ""
      ) {
        setLinks((prev) => [
          { original_url: state.url!, shorten_url: state.alias! },
          ...prev,
        ]);

        toast.success("New Shorten URL has been created!", {
          description: state.alias,
          action: {
            label: "Copy",
            onClick: () => copyLinkFn(state.alias),
          },
        });
      }
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
              value={formState.url}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, url: e.target.value }))
              }
              className="bg-background-light-100 dark:bg-background-dark-700"
            />
            <p className="text-sm font-light text-red-500">
              {state.error?.url}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="alias">Alias</Label>
            <Input
              id="alias"
              name="alias"
              placeholder="Enter an alias (optional)"
              maxLength={32}
              required
              value={formState.alias}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  alias: e.target.value,
                }))
              }
              className="bg-background-light-100 dark:bg-background-dark-700"
            />
            <p className="text-sm font-light text-red-500">
              {state.error?.alias}
            </p>
            <p className="break-words text-sm font-light text-neutral-400">
              Your url would be {process.env.NEXT_PUBLIC_APP_URL}/
              {formState.alias}
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
            onClick={randomizeAlias}
            className="flex items-center gap-2 bg-accent-light-500 hover:bg-accent-light-400 dark:bg-accent-light-500 dark:text-white hover:dark:bg-accent-dark-400"
          >
            <Dice5Icon size={16} />
            Randomize Alias
          </Button>
          <Button
            type="submit"
            form="shorten-form"
            className="bg-primary-light-500 hover:bg-primary-light-400 dark:bg-primary-dark-600 dark:text-white hover:dark:bg-primary-dark-500"
          >
            Shorten
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
