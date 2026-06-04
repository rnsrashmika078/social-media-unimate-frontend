import Card from "@/components/custom/card";
import Description from "@/components/custom/description";
import UserPlate from "@/components/custom/user_plate";
import Post from "@/components/main/Post";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-5">
            <div className="grid grid-cols-1">
                <Post />
                <Post />
                <Post />
            </div>
        </main>
    );
}
