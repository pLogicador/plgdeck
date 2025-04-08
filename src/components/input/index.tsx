"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoSearchCircle } from "react-icons/io5";

export function Input() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (input == "") return;

    router.push(`/game/search/${input}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-gray-900 my-5 flex gap-2 items-center justify-between p-2 rounded-lg"
    >
      <input
        className=" bg-gray-900 outline-none w-11/12"
        type="text"
        placeholder="Find your game..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <IoSearchCircle size={24} color="#ffae00" />
      </button>
    </form>
  );
}
