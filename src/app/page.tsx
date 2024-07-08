import { ShortenList } from "@/components/ShortenList";
import { Navbar } from "@/components/Navbar";
import { ShortenForm } from "@/components/ShortenForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-svh w-full bg-background-light-500 transition-colors duration-200 dark:bg-background-dark-500">
        <section id="hero" className="relative w-full py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 p-4">
            <h1 className="max-w-xl text-center text-4xl font-bold sm:text-5xl">
              Shorten your long URL as eazy as{" "}
              <span className="bg-gradient-to-r from-primary-light-500 via-secondary-light-500 to-accent-light-500 bg-clip-text text-transparent dark:from-primary-dark-500 dark:via-secondary-dark-500 dark:to-accent-dark-500">
                Copy and Paste
              </span>
            </h1>
            <ShortenForm />
          </div>
        </section>
        <ShortenList />
      </main>
    </>
  );
}
