import Profile from "@/components/custom/profile";
const ProfilePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  console.log("ID", id);
  return (
      <Profile id={id} />
  );
};

export default ProfilePage;
