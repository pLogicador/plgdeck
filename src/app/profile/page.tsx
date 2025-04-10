import { Container } from "@/components/container";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import { FavoriteDeck } from "./components/favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Customize Your Gaming Space.",
  description: "Create a unique profile with your name and favorite games.",
  openGraph: {
    images: [`${process.env.PROJECT_URL}/user-male.png`],
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

export default function Profile() {
  return (
    <main className="w-full text-white">
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              src="/user-male.png"
              alt="User male profile image"
              priority={true}
              quality={100}
              width={224} // 56 * 4 = 224px
              height={224}
              className="rounded-full hover:opacity-50 transition-all duration-300 object-cover"
            />
            <h1 className="font-bold text-2xl">User name</h1>
          </div>

          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <button className="bg-gray-900 px-4 py-3 rounded-lg text-white">
              Settings
            </button>
            <button className="bg-gray-900 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="#fff" />
            </button>
          </div>
        </section>

        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteDeck />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteDeck />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteDeck />
          </div>
        </section>
      </Container>
    </main>
  );
}
