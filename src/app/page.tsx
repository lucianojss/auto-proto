import { AISearchInput } from "@/components/client/ai-search-input";

export default async function Home() {
  return (
    <section className="py-12 md:py-24 lg:py-32 flex flex-col space-y-4">
      <h1 className="text-center font-bold tracking-tighter text-5xl xl:text-6xl/none">
        Find your perfect used car
      </h1>
      <p className="text-center text-muted-foreground md:text-xl mb-8">
        Search thousands of used cars from trusted dealers and private sellers.
      </p>
      <AISearchInput />
    </section>
  );
}
