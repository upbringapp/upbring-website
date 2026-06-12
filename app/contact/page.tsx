export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-5xl font-bold mb-10">Contact Us</h1>

      <p className="mb-8">
        We'd love to hear from you. For questions, feedback or collaborations,
        feel free to reach out.
      </p>

      <div className="space-y-6 text-lg">
        <div>
          <h2 className="text-2xl font-semibold">Email</h2>
          <p>hello@upbringapp.com</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Website</h2>
          <p>https://upbringapp.com</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Instagram</h2>
          <a
            href="https://instagram.com/officialupbring"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            @officialupbring
          </a>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">YouTube</h2>
          <a
            href="https://youtube.com/@officialupbring"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            @officialupbring
          </a>
        </div>
      </div>
    </main>
  );
}