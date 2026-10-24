"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  if (subscribed) {
    return (
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-300 text-black text-xs flex items-center justify-center gap-2 font-medium max-w-md mx-auto">
        <CheckCircle2 className="w-4 h-4 text-black" />
        <span>Thank you for subscribing to our newsletter updates!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--secondary)]"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <>
            <Send className="w-3.5 h-3.5 text-white" /> Subscribe
          </>
        )}
      </button>
    </form>
  );
}
