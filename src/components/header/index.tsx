import Image from "next/image";
import Link from "next/link";
import { FaGamepad } from "react-icons/fa";
import { LiaGamepadSolid } from "react-icons/lia";

export function Header() {
  return (
    <header className="w-full h-28 bg-gray-800 text-amber-50 px-2">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image
              src="/logo-plg.eckpng-removebg-preview.png"
              alt="PlgDeck website logo"
              quality={100}
              width={140}
              height={40}
              priority
              className="w-full"
            />
          </Link>

          <Link href="/">Games</Link>
          <Link href="/profile">Profile</Link>
        </nav>

        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <FaGamepad size={34} color="#000" />
          </Link>
        </div>
      </div>
    </header>
  );
}
