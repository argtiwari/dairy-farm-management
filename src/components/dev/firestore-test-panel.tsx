"use client";

import { useState } from "react";
import type { FirestoreConnectionTestResult } from "@/lib/firebase/firestore-test-service";

type TestState = "idle" | "running" | "success" | "error";

export function FirestoreTestPanel() {
  const [error, setError] = useState("");
  const [result, setResult] = useState<FirestoreConnectionTestResult | null>(null);
  const [state, setState] = useState<TestState>("idle");

  async function handleRunTest() {
    setError("");
    setResult(null);
    setState("running");

    try {
      const { runFirestoreConnectionTest } = await import(
        "@/lib/firebase/firestore-test-service"
      );
      const testResult = await runFirestoreConnectionTest();

      setResult(testResult);
      setState("success");
    } catch (unknownError) {
      const message =
        unknownError instanceof Error
          ? unknownError.message
          : "Firestore connection test failed.";

      setError(message);
      setState("error");
    }
  }

  return (
    <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Firestore connection test</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This creates one temporary document in Firestore, then reads the same document back.
        </p>
      </div>

      <button
        className="h-11 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={state === "running"}
        onClick={handleRunTest}
        type="button"
      >
        {state === "running" ? "Running test..." : "Run Firestore test"}
      </button>

      {state === "success" && result ? (
        <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          <p className="font-semibold">Success</p>
          <p className="mt-1">Document ID: {result.id}</p>
          <p className="mt-1">Status: {result.status}</p>
          <p className="mt-1">Message: {result.message}</p>
        </div>
      ) : null}

      {state === "error" ? (
        <div className="rounded-md bg-rose-50 p-3 text-sm text-rose-700">
          <p className="font-semibold">Test failed</p>
          <p className="mt-1">{error}</p>
        </div>
      ) : null}
    </section>
  );
}
