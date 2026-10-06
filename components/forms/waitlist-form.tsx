"use client";

import { FormEvent, useId, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  acquireSubmissionLock,
  isValidEmail,
  normalizeEmail,
  releaseSubmissionLock,
  type WaitlistResponse,
} from "@/lib/waitlist";

type FormStatus = "default" | "loading" | "success" | "duplicate" | "failure";

const statusMessages: Record<FormStatus, string> = {
  default: "",
  loading: "Joining the waitlist.",
  success: "Welcome to Nasbring! Thank you for joining our early community.",
  duplicate:
    "You're already part of the Nasbring community. We'll let you know when we launch.",
  failure: "Something went wrong. Please try again.",
};

export function WaitlistForm() {
  const emailId = useId();
  const errorId = useId();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("default");
  const [validationMessage, setValidationMessage] = useState("");
  const submittingRef = useRef(false);

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail) {
      setValidationMessage("Please enter your email");
      setStatus("failure");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setValidationMessage("Please enter a valid email address");
      setStatus("failure");
      return;
    }

    if (!acquireSubmissionLock(submittingRef)) {
      return;
    }

    setValidationMessage("");
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
        }),
      });
      const result = (await response.json()) as WaitlistResponse;

      if (result.ok) {
        if (result.status === "already_joined") {
          setStatus("duplicate");
          toast(
            "❤️ You're already part of the Nasbring community. We'll let you know when we launch.",
            {
              duration: 4000,
            },
          );
          return;
        }

        setStatus("success");
        toast.success(
          "🌱 Welcome to Nasbring! Thank you for joining our early community.",
          {
            duration: 5000,
          },
        );
        setEmail("");
        return;
      }

      if (result.code === "INVALID_EMAIL") {
        setValidationMessage("Please enter a valid email address");
        setStatus("failure");
        return;
      }

      setStatus("failure");
    } catch {
      setStatus("failure");
    } finally {
      releaseSubmissionLock(submittingRef);
      requestAnimationFrame(() => submitButtonRef.current?.focus());
    }
  }

  const hasError = status === "failure";

  return (
    <>
      <Toaster position="top-center" />
      <form
        id="waitlist-form"
        className="mt-8 max-w-lg"
        noValidate
        aria-busy={status === "loading"}
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
            className="h-12 min-h-12 min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-white px-5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] disabled:cursor-wait disabled:bg-[#f3f4f6] disabled:text-[var(--text-secondary)]"
          />
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-12 appearance-none items-center justify-center rounded-2xl border border-[#111111] bg-[#111111] px-6 text-sm font-medium text-white shadow-none transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:border-[#2f2f2f] hover:bg-[#2f2f2f] active:border-[#111111] active:bg-[#111111] disabled:cursor-wait disabled:border-[#e5e7eb] disabled:bg-[#e5e7eb] disabled:text-[#5f6368]"
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
