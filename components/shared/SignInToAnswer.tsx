import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  userId: string;
  questionId: string;
}

export default function SignInToAnswer({ userId, questionId }: Props) {

  return (
    <div>
      {!userId && (
        <>
          <div className="flex flex-col justify-between gap-5 mt-5 sm:flex-row sm:items-center sm:gap-2">
            <h4 className="paragraph-semibold text-dark400_light800">
              Sign In To Write an answer
            </h4>

            <Link href="/sign-in">
              <Button
                className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
              >
                <Image
                  src="/assets/icons/stars.svg"
                  alt="star"
                  width={12}
                  height={12}
                  className="object-contain"
                />
                Sign In
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
