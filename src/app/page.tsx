import { Container } from "@/components/container";
import { GameDeck } from "@/components/GameDeck";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightSquare } from "react-icons/bs";

async function getPlgDeck() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 350 } }
    );
    return response.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

async function getGamesData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=games`,
      { next: { revalidate: 350 } }
    );
    return response.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const plgdeck: GameProps = await getPlgDeck();
  const gamesData: GameProps[] = await getGamesData();

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          What are you in the mood to play?
        </h1>

        <Link href={`/game/${plgdeck.id}`}>
          <section
            className="w-full bg-black rounded-lg"
            style={{
              boxShadow: "0 0 5px #fff",
            }}
          >
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">{plgdeck.title}</p>
                <BsArrowRightSquare size={24} color="#fff" />
              </div>

              <Image
                src={plgdeck.image_url}
                alt={plgdeck.description}
                priority={true}
                quality={100}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </section>
        </Link>

        <Input />
        <h2 className="text-lg font-bold mt-8 mb-5">Games to discovery</h2>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gamesData.map((item) => (
            <GameDeck key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
