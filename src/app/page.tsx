import { connectToDatabase } from "@/lib/mongoose";

export default async function Home() {
  const connect = connectToDatabase();
  console.log(connect)
  return (
    <>
      <div>Homepage</div>
    </>
  );
}
