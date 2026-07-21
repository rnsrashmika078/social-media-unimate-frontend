import Profile from "@/components/profile/Profile";
import { redirect } from "next/navigation";
const ProfilePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  if (!id) redirect("/feed");
  return <Profile id={id} />;
};

export default ProfilePage;
