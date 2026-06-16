import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <video
        src={"./videos/intro.mp4"}
        className="w-full h-full object-cover"
        autoPlay
      />
      <Link href={"/feed"}>
        <Button className="cursor-pointer fixed bottom-20 left-1/2 -translate-x-1/2 p-5 animate-pulse">
          CLICK TO CONTINUE
        </Button>
      </Link>
    </main>
  );
}
