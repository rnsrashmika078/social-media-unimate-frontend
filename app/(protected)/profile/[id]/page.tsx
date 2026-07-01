import { getUserProfile } from "@/app/helper/auth";
import Profile from "@/components/custom/profile";

const ProfilePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  const user = await getUserProfile(id);
  return (
    <div className="p-5">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
