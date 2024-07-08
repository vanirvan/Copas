"use client";

import { useReadLocalStorage } from "usehooks-ts";
import { ShortenCard } from "./ShortenCard";
import { useEffect, useState } from "react";

interface Links {
  original_url: string;
  shorten_url: string;
}

export function ShortenList() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = useReadLocalStorage<Links[]>("copas-links");
  return (
    <section id="shorten-list" className="py-16">
      <div className="mx-auto flex max-w-xl flex-col gap-4 px-4">
        {isMounted &&
          links?.map((l, key) => (
            <ShortenCard
              key={key}
              original_url={l.original_url}
              shorten_url={l.shorten_url}
            />
          ))}
      </div>
    </section>
  );
}
