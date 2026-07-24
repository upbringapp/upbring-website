import { HomeOutputCard } from "@/components/product/home-output-card";

const homeOutputs = [
  { label: "Aaj Kya Seekha", variant: "standard" },
  { label: "Parent Summary", variant: "standard" },
  { label: "Real Life Mein Dekho", variant: "standard" },
  { label: "Dinner Table Conversation", variant: "conversation" },
  { label: "Worth Revisiting", variant: "revisiting" },
] as const;

export function HomeSection() {
  return (
    <section
      aria-labelledby="home-heading"
      className="page-container section-spacing"
    >
      <div className="editorial-width">
        <h2 id="home-heading" className="text-4xl md:text-5xl">
          Home
        </h2>
      </div>

      <ol className="mt-10 overflow-hidden rounded-[var(--card-radius)] border border-[var(--border)] bg-white lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:grid-rows-3">
        {homeOutputs.map((output, index) => (
          <HomeOutputCard
            key={output.label}
            index={index + 1}
            label={output.label}
            variant={output.variant}
          />
        ))}
      </ol>
    </section>
  );
}
