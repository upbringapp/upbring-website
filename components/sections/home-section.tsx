import { HomeOutputCard } from "@/components/product/home-output-card";
import { homeContent } from "@/content/editorial";

const homeOutputs = [
  { label: "Aaj Kya Seekha", content: homeContent[0], variant: "standard" },
  { label: "Parent Summary", content: homeContent[1], variant: "standard" },
  { label: "Real Life Mein Dekho", content: homeContent[2], variant: "standard" },
  { label: "Worth Revisiting", content: homeContent[4], variant: "revisiting" },
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

      <ol className="mt-10 overflow-hidden rounded-[var(--card-radius)] border border-[var(--border)] bg-white lg:grid lg:grid-cols-3 lg:[&>li:nth-child(-n+2)]:border-r lg:[&>li:nth-child(-n+3)]:border-t-0">
        {homeOutputs.map((output, index) => (
          <HomeOutputCard
            key={output.label}
            index={index + 1}
            label={output.label}
            content={output.content}
            variant={output.variant}
          />
        ))}
      </ol>
    </section>
  );
}
