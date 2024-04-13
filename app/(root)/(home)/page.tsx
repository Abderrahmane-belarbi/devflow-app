import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1 className="h1-bold">This is a pice of text</h1>
    </div>
  );
}
