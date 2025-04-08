export const dynamicParams = true;
export const dynamic = "force-dynamic";

import { Container } from "@/components/container";
import { GameDeck } from "@/components/GameDeck";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/game";

async function getData(title: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return null;
  }
}

export default async function Search({
  params,
}: {
  params: { title: string };
}) {
  const { title } = params;
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-white">
      <Container>
        <Input />
        <h2 className="font-bold text-xl mt-8 mb-5">
          See what we found in our base
        </h2>

        {!games && <p>This game was not found!</p>}
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map((item) => <GameDeck key={item.id} data={item} />)}
        </section>
      </Container>
    </main>
  );
}
