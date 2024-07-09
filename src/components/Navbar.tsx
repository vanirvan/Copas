import Link from "next/link";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";

export function Navbar() {
  return (
    <section
      id="navbar"
      className="fixed left-0 top-0 z-10 w-full px-4 py-2 backdrop-blur-sm transition-colors duration-200"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">COPAS</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={"https://github.com/vanirvan/Copas"}>
            <Button
              size={"icon"}
              variant={"outline"}
              className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <GithubIcon size={16} />
            </Button>
          </Link>
          <ToggleThemeButton />
        </div>
      </div>
    </section>
  );
}
