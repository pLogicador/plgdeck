"use client";

import { useState } from "react";
import { FaEdit, FaWindowClose } from "react-icons/fa";

export function FavoriteDeck() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState("");

  function handleButton() {
    setShowInput(!showInput);
    if (input !== "") setGameName(input);
    setInput("");
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {showInput ? (
        <div className="flex items-center justify-center gap-3">
          <input
            className="w-full px-2 bg-gray-800 text-amber-300"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="hover:scale-110 duration-200 transition-all text-white hover:text-red-500"
            onClick={handleButton}
          >
            <FaWindowClose size={24} />
          </button>
        </div>
      ) : (
        <button
          className="self-start hover:scale-110 duration-200 transition-all"
          onClick={handleButton}
        >
          <FaEdit size={24} color="#fff" />
        </button>
      )}

      {gameName && (
        <div>
          <span className="text-white">Favorite Game:</span>
          <p className="font-bold text-gray-400">{gameName}</p>
        </div>
      )}

      {!gameName && <p className="font-bold text-white">Add game</p>}
    </div>
  );
}
