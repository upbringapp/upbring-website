export const metadata = {
  title: "Upbring Blog | Parenting, Learning and Character Development",
  description:
    "Insights on parenting, curiosity, storytelling, growth mindset and character development for children.",
};
export default function Blog() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-8">
        Upbring Blog
      </h1>

      <p className="text-xl text-gray-600 mb-12">
        Insights on parenting, curiosity, learning and character development.
      </p>

      <div className="space-y-10">

        <article>
          <h2 className="text-2xl font-semibold">
            How to Raise Curious Children
          </h2>
          <p className="text-gray-600">
            Practical ways to nurture curiosity and lifelong learning.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">
            Growth Mindset for Kids
          </h2>
          <p className="text-gray-600">
            Helping children develop resilience and confidence.
          </p>
        </article>

    <article>
  <h2 className="text-2xl font-semibold">
    Why Storytelling Matters
  </h2>

  <p className="text-gray-600">
    Stories can inspire values, imagination and learning.
  </p>
</article>

<article>
  <h2 className="text-2xl font-semibold">
    Character Building Activities for Kids
  </h2>

  <p className="text-gray-600">
    Fun ways to develop values, empathy and confidence.
  </p>
</article>

<article>
  <h2 className="text-2xl font-semibold">
    Parenting in the AI Age
  </h2>

  <p className="text-gray-600">
    Helping children thrive in a world shaped by technology and AI.
  </p>
</article>    

<article>
  <h2 className="text-2xl font-semibold">
    Parenting in the AI Age
  </h2>
  <p className="text-gray-600">
    Helping children thrive in a world shaped by technology and AI.
  </p>
</article>
          
         

      </div>
    </main>
  );
}