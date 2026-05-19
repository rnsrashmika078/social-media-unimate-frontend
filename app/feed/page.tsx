import Post from "@/components/main/Post";
const route = process.env.NEXT_PUBLIC_API_URL!;

const page = async () => {
  // const friends = await api.get("/friends", {
  //   headers: {
  //     Accept: "Application/json",
  //   },
  // });

  const res = await fetch(`${route!}/api/v1/friends`, {
    headers: {
      Accept: "Application/json",
    },
    credentials: "include",
  });
  console.log("URL", route);

  const result = await res.json();
  console.log("friends", result.friends);
  return (
    <div>
      <Post />
      <Post />
    </div>
  );
};

export default page;
