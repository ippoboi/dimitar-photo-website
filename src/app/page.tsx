import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space-y-4 items-center justify-center">
      <Link href="/about">About</Link>
      <Link href="/gallery">Gallery</Link>
    </main>
  );
}
