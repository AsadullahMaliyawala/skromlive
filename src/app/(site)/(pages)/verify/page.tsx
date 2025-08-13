"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const presetEmail = params.get("email") || "";

  const [email, setEmail] = useState(presetEmail);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Breadcrumb title={"Verify Email"} pages={["Verify"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Check Your Email for a code
              </h2>
              <p>Enter 6-character code</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                try {
                  const resp = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, code }),
                  });
                  const data = await resp.json().catch(() => ({}));
                  if (!resp.ok) {
                    setError(data?.error || "Invalid code");
                  } else {
                    setSuccess(true);
                    setTimeout(() => router.push("/signin"), 1200);
                  }
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="mb-5">
                <label className="block mb-2.5">Email</label>
                <input
                  type="email"
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2.5">Code</label>
                <input
                  type="text"
                  maxLength={6}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-2">Verified. Redirecting…</p>}

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>

              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  className="text-blue"
                  onClick={async () => {
                    setError(null);
                    setLoading(true);
                    try {
                      const resp = await fetch("/api/auth/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, name: email.split('@')[0], password: "temporary-ignored" }),
                      });
                      // The above is a placeholder; ideally call a dedicated resend endpoint.
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Resend code
                </button>
                <button type="button" className="block text-dark-4">Re-enter Email Address</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


