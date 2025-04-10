import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Label } from "./components/label";
import { GameDeck } from "@/components/GameDeck";
import { Metadata } from "next";

interface PropsParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title:
            "PlgDeck - Check out detailed info, images, and gameplay insights for the game",
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (err) {
    return {
      title:
        "PlgDeck - Check out detailed info, images, and gameplay insights for the game",
    };
  }
}

async function getData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    const data = response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

async function getGameSorted() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    const data = response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function GameDetailId({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

  if (!data) redirect("/");

  return (
    <main className="w-full text-white">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          src={data.image_url}
          alt={data.title}
          priority={true}
          quality={100}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          className="object-cover w-full h-80 sm:h-96 opacity-55"
        />
      </div>

      <Container>
        <h2 className="font-bold text-xl my-4">{data.title}</h2>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Categories</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Platforms</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Release date:</strong>
          {data.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Recommended game:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameDeck data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
