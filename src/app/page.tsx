import { Navbar } from "../components/Navbar";
import { ShortenForm } from "../components/ShortenForm";

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
        <section id="shorten-result" className="h-96"></section>
      </main>
    </>
  );
}

// "use client";

// import { shorteningURLAction } from "@/lib/actions/shorteningURLAction";
// import { useFormState } from "react-dom";

// export default function Home() {
//   const [state, action] = useFormState(shorteningURLAction, {
//     original_url: "",
//     shortened_url: "",
//     error: null,
//   });

//   return (
//     <>
//       <main className="relative w-full flex flex-col justify-center items-center">
//         <form action={action} className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="original_url"
//             placeholder="URL You want to shortened"
//             required
//           ></input>
//           <input
//             type="text"
//             name="shortened_url"
//             placeholder="Shortened URL"
//           ></input>
//           <button type="submit" className="border rounded-lg py-2">
//             Create
//           </button>
//         </form>
//         {state.original_url}
//         {state.shortened_url}
//       </main>
//     </>
//   );
// }
