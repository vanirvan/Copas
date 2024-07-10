import { CopyIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import type { Link as LinkType } from "@/lib/types/link-type";

interface ComponentProps extends LinkType {
  onDeleteFn: ({ original_url, shorten_url }: LinkType) => void;
}

export function ShortenCard({
  original_url,
  shorten_url,
  onDeleteFn,
}: ComponentProps) {
  const [copiedText, copy] = useCopyToClipboard();

  const _onCopy = () => {
    copy(shorten_url);
    toast("URL Copied!", {
      description: copiedText,
    });
  };

  const _onDelete = () => {
    onDeleteFn({ original_url, shorten_url });
  };

  return (
    <Card className="bg-background-light-100 shadow dark:bg-background-dark-600">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <h1 className="break-words text-lg font-bold">{shorten_url}</h1>
            <h2 className="break-words text-xs font-light">{original_url}</h2>
          </div>
          <div className="flex flex-row items-center justify-end gap-2 sm:flex-col sm:justify-start">
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={_onCopy}
              className="hover:bg-green-500 hover:text-white"
            >
              <CopyIcon size={16} />
            </Button>
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={_onDelete}
              className="hover:bg-red-500 hover:text-white"
            >
              <TrashIcon size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
