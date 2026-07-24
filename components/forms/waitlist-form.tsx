"use client";

import { FormEvent, useId, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";

type FormStatus = "default" | "loading" | "success" | "duplicate" | "failure";

const statusMessages: Record<FormStatus, string> = {
  default: "",
  loading: "Joining the waitlist.",
  success: "Welcome to Upbring! Thank you for joining our early community.",
  duplicate:
    "You're already part of the Upbring community. We'll let you know when we launch.",
  failure: "Something went wrong. Please try again.",
};

export function WaitlistForm() {
  const emailId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("default");
  const [validationMessage, setValidationMessage] = useState("");

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!email) {
      setValidationMessage("Please enter your email");
      setStatus("failure");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address");
      setStatus("failure");
      return;
    }

    setValidationMessage("");
    setStatus("loading");

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email: cleanEmail }]);

    if (error) {
      console.log(error);

      if (error.message.includes("duplicate")) {
        setStatus("duplicate");
        toast(
          "❤️ You're already part of the Upbring community. We'll let you know when we launch.",
          {
            duration: 4000,
          },
        );
      } else {
        setStatus("failure");
      }

      return;
    }

    setStatus("success");
    toast.success(
      "🌱 Welcome to Upbring! Thank you for joining our early community.",
      {
        duration: 5000,
      },
    );

    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cleanEmail,
      }),
    });

    setEmail("");
  }

  const hasError = status === "failure";

  return (
    <>
      <Toaster position="top-center" />
      <form
        id="waitlist-form"
        className="mt-8 max-w-lg"
        noValidate
        onSubmit={joinWaitlist}
      >
        <label
          htmlFor={emailId}
          className="font-heading text-sm text-[var(--text-primary)]"
        >
          Email address
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            aria-describedby={hasError ? errorId : undefined}
            aria-invalid={hasError}
            disabled={status === "loading"}
            onChange={(event) => {
              setEmail(event.target.value);
              if (validationMessage) {
                setValidationMessage("");
                setStatus("default");
              }
            }}
            className="min-h-12 min-w-0 flex-1 rounded-full border border-[var(--border)] bg-white px-5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] disabled:cursor-wait disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--text-primary)] px-6 text-sm font-medium text-white transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:bg-[var(--text-secondary)] disabled:cursor-wait disabled:opacity-60"
          >
            {status === "loading" ? "Joining…" : "Start quietly."}
          </button>
        </div>

        {validationMessage ? (
          <p
            id={errorId}
            className="mt-3 text-sm text-[var(--text-secondary)]"
          >
            {validationMessage}
          </p>
        ) : null}

        <p
          aria-live="polite"
          aria-atomic="true"
          className="mt-3 min-h-6 text-sm text-[var(--text-secondary)]"
        >
          {validationMessage || statusMessages[status]}
        </p>
      </form>
    </>
  );
}
