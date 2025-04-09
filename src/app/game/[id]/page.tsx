import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
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
      </Container>
    </main>
  );
}
