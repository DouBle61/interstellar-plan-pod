"use client";

import { useState } from "react";
import { COSMIC_QUOTES } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function PeaceFab() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState("");

  const handleClick = () => {
    const randomQuote =
      COSMIC_QUOTES[Math.floor(Math.random() * COSMIC_QUOTES.length)];
    setQuote(randomQuote);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cosmos-600 shadow-glow transition-all duration-300 hover:bg-cosmos-500 hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] active:scale-95"
        aria-label="Peace - 星际金句"
      >
        <span className="text-xl">☮️</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="text-2xl">🌌</span>
              <br />
              <span className="mt-2 inline-block font-space text-base">
                来自星际的一句话
              </span>
            </DialogTitle>
            <DialogDescription className="pt-4 text-base leading-relaxed text-starlight/80">
              {quote}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <button
              onClick={() => setOpen(false)}
              className="btn-starlight rounded-xl bg-cosmos-700/50 px-6 py-2 text-sm text-cosmos-200 transition-colors hover:bg-cosmos-600/50"
            >
              peace ✌️
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}