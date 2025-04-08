import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { FaChevronCircleRight } from "react-icons/fa";

interface GameDeckProps {
  data: GameProps;
}

export function GameDeck({ data }: GameDeckProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <section className="w-full bg-linear-to-tl from-black to-gray-900 rounded-lg p-4 mb-5">
        <div className="relative w-full h-56">
          <Image
            src={data.image_url}
            alt={data.title}
            priority={true}
            quality={100}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
            className="object-cover rounded-lg hover:scale-105 transition-all duration-300"
          />
        </div>

        <div className="flex items-center mt-4 justify-between">
          <p className=" text-sm font-bold px-2 text-white text-ellipsis truncate whitespace-nowrap overflow-hidden">
            {data.title}
          </p>
          <FaChevronCircleRight size={24} color="#fff" />
        </div>
      </section>
    </Link>
  );
}
