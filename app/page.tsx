"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Script from "next/script";
import {
  Telescope,
  Shield,
  Heart,
  Tent,
  Infinity,
  Pencil,
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

async function joinWaitlist() {
  if (!email) {
    alert("Please enter your email");
    return;
  }

  const { error } = await supabase
    .from("waitlist")
    .insert([{ email }]);

  if (error) {
  console.log(error);
  alert(error.message);
}
   else {
    alert("You're on the waitlist 🎉");
    setEmail("");
  }
}
  return (
    <>
<Script
id="schema-org"
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify({
"@context": "https://schema.org",
"@type": "Organization",
name: "Upbring",
url: "https://upbringapp.com",
logo: "https://upbringapp.com/logo.jpg",
description:
"Helping families nurture curiosity, character and a lifelong of learning.",
sameAs: [],
}),
}}
/>


    <main className=" bg-[#fafaf8] text-gray-900">

      {/* Navbar */}
      <nav className="bg-[#fafaf8]/80 backdrop-blur z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center">
  <img
  src="/logo.jpg"
  alt="Upbring"
  className="h-12 w-auto"
/>
</div>

          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <a href="#">Home</a>
            <a href="#canopy">Canopy</a>
            <a href="#">Parents</a>
            <a href="#">Contact</a>
          </div>

          <button
  
  
  onClick={joinWaitlist}
  className="bg-black text-white px-8 py-4 rounded-2xl"
>
  Join Early Access
</button>

        </div>
      </nav>

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">

       <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-orange-100 shadow-sm">

  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
    ✨
  </div>

  <div className="w-px h-8 bg-gray-200"></div>

  <span className="text-xl font-medium tracking-[0.2em] text-gray-900">
    Coming Soon
  </span>

</div>
        

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Raising Curious Minds.
        </h1>

        <h2 className="text-3xl md:text-6xl text-gray-400 mt-5">
          Growing Strong Values.
        </h2>

        <p className="max-w-2xl mx-auto mt-8 text-gray-500 text-lg">
         Helping families nurture curiosity, character and a lifelong love of learning.
          </p> 
         <div className="mt-8 flex justify-center">
  <input type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="border px-5 py-4 rounded-2xl w-80 text-center"
  />
  </div>
       

        <div className="flex flex-wrap justify-center gap-4 mt-12">

          <button
  onClick={joinWaitlist}
  className="bg-black text-white px-8 py-4 rounded-2xl"
>
  Join Early Access
</button>


          <button className="border px-8 py-4 rounded-2xl">
            Explore Upbring →
          </button>

        </div>

      </section>
{/* What is Upbring */}

<section className="max-w-5xl mx-auto px-6 py-24">

  <div className="text-center">

    <h2 className="text-4xl md:text-5xl font-bold mb-8">
      What is Upbring?
    </h2>

    <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">

      Upbring is an AI-powered learning companion for curious families.

      <br /><br />

      Helping parents and children learn together through conversations,
      curiosity and meaningful guidance.

      <br /><br />

     Less pressure.
<br />
More conversations.

<br /><br />

Less comparison.
<br />
More curiosity.

<br /><br />

Less fear.
<br />
More confidence.
    </p>

  </div>

</section>
{/* Parent Companion */}

<section className="max-w-5xl mx-auto px-6 py-24">

  <div className="text-center mb-16">

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Parent Companion
    </h2>

    <p className="text-gray-500 text-lg">
      Small questions. Big conversations.
    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-8">

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
       • Sabse tough question kaun sa laga aaj?
    </div>

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
      • Galti se aaj tumhe kya seekh mili?
    </div>

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
       • What made you smile today?
    </div>

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
       • If you had to teach me just one question from today's paper, which one would it be?
    </div>

  </div>

</section>
      {/* Canopy Community */}

      <section
        id="features"
        className="max-w-6xl mx-auto px-6 pb-28"
      >

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold">
  Canopy Community
</h2>

          <p className="text-gray-500 mt-5">
  Parenting is better when families learn and grow together.
</p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Curiosity */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300">

            <Telescope className="w-8 h-8 text-blue-500 mb-6" />

            <h3 className="text-3xl font-bold mb-4">
              Curiosity
            </h3>

            <p className="text-gray-600">
              Looking further and discovering the unknown.
              Every child is born curious—we nurture that spark.
            </p>

          </div>


          {/* Character */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm">

            <div className="relative w-10 h-10 mb-6">

              <Shield className="w-10 h-10 text-rose-500" />

              <Heart className="absolute w-3 h-3 text-rose-500 fill-rose-500 top-[13px] left-[13px]" />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Character
            </h3>

            <p className="text-gray-600">
              Strong values with a caring heart.
              Empathy and integrity matter more than marks.
            </p>

          </div>


          {/* Canopy */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm">

            <Tent className="w-8 h-8 text-green-600 mb-6" />

            <h3 className="text-3xl font-bold mb-4">
              Canopy
            </h3>

            <p className="text-gray-600">
              A safe ecosystem where families support,
              connect and grow together.
            </p>

          </div>


          {/* Lifelong Learning */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm">

            <div className="flex gap-2 mb-6">

              <Infinity className="w-7 h-7 text-purple-500" />

              <Pencil className="w-5 h-5 text-amber-500" />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Lifelong Learning
            </h3>

            <p className="text-gray-600">
              Learning never ends. Growth and reflection continue for life.
            </p>

          </div>

        </div>

      </section>

     
{/* Footer */}
<footer className="border-t mt-24 py-12 text-center text-gray-500">
  <h3 className="text-2xl font-semibold text-gray-900">
    Upbring
  </h3>

  <p className="mt-3">
    Raising Curious Minds. Growing Strong Values.
  </p>

  <div className="flex justify-center gap-8 mt-8">
    <a href="#">Home</a>
    <a href="#canopy">Canopy</a>
    <a href="#parents">Parents</a>
    <a href="#contact">Contact</a>
  </div>

  <p className="mt-8 text-sm">
    © 2026 Upbring. Built for curious families.
  </p>
</footer>
    </main>
    </>
  );
}