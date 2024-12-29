"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-dvh w-full mt-10 items-center">
      <h2 className="text-3xl text-orange-600">
        ZZzzzZZZzzZzzZZZ!
      </h2>
      <button
        className="border-2 border-orange-600 rounded-full px-4 py-2 mt-4 text-orange-600 hover:bg-orange-600 hover:text-stone-50"
        onClick={() => reset()}
      >
        Reload
      </button>
    </div>
  );
}
