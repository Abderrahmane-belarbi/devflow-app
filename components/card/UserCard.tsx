import Image from "next/image";
import Link from "next/link";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  }
}

export default function UserCard({ user }: Props) {
  return (
    <Link href={`/profile${user._id}`} className="shadow-light-100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt='user-pic'
          width={100}
          height={100}
          className="rounded-full"
        />
      </article>
    </Link>
  )
}
