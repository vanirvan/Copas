"use client";

import { useEffect, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { ShortenCard } from "@/components/ShortenCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { deleteShortenAction } from "@/lib/actions/deleteShortenAction";
import type { Link as LinkType } from "@/lib/types/link-type";

export function ShortenList() {
  const [isMounted, setIsMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<LinkType>({
    original_url: "",
    shorten_url: "",
  });

  const [state, deleteAction] = useFormState(deleteShortenAction, null);

  const [links, setLinks, removeLinks] = useLocalStorage<LinkType[]>(
    "copas-links",
    [],
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onDeleteTriggerFn = ({
    original_url,
    shorten_url,
  }: {
    original_url: string;
    shorten_url: string;
  }) => {
    setDialogData({
      original_url,
      shorten_url,
    });
    setDialogOpen(true);
  };

  const confirmDeleteButton = () => {
    setDialogOpen(false);

    // delete data on server
    const formData: FormData = new FormData();
    formData.append("shorten_url", dialogData.shorten_url);
    deleteAction(formData);

    // delete data on localStorage
    setLinks(links.filter((lf) => lf.shorten_url != dialogData.shorten_url));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && links.length > 0 && (
        <section id="shorten-list" className="py-16">
          <div className="mx-auto flex max-w-xl flex-col gap-4 px-4">
            {links?.map((l, key) => (
              <ShortenCard
                key={key}
                original_url={l.original_url}
                shorten_url={l.shorten_url}
                onDeleteFn={onDeleteTriggerFn}
              />
            ))}
          </div>
        </section>
      )}
      {isDesktop ? (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-background-light-100 dark:bg-background-dark-600 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete URL</DialogTitle>
              <DialogDescription>
                URL{" "}
                <span className="font-bold text-text-light-500 dark:text-text-dark-500">
                  {dialogData.shorten_url}
                </span>{" "}
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={confirmDeleteButton}
              variant={"destructive"}
              className="w-full"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
          <DrawerContent className="bg-background-light-100 dark:bg-background-dark-600">
            <DrawerHeader className="text-left">
              <DrawerTitle>Delete URL</DrawerTitle>
              <DrawerDescription>
                URL{" "}
                <span className="font-bold text-text-light-500 dark:text-text-dark-500">
                  {dialogData.shorten_url}
                </span>{" "}
                will be deleted, are you sure?
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <Button
                onClick={confirmDeleteButton}
                variant={"destructive"}
                className="w-full"
              >
                Delete
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
