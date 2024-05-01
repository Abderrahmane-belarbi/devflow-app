import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";
import { getHotQuestion } from "@/lib/actions/question.action";

export default async function RightSidebar() {
  const hotQestions = await getHotQuestion();

  return (
    <section
      className="background-light900_dark200
        light-border sticky right-0 top-0 flex h-screen
        flex-col overflow-y-auto border-l p-6
        pt-36 shadow-light-300 dark:shadow-none
        max-xl:hidden w-[350px] custom-scrollbar"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQestions.map((question) => (
            <Link
              className="flex cursor-pointer items-center justify-between gap-7"
              href={`/question/${question._id}`}
              key={question._id}
            >
              <p className="body-medium text-dark500_light700">{question.title}</p>
              <Image
                className="invert-colors"
                src="/assets/icons/chevron-right.svg"
                alt="right-arrow"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {/* {popularTags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} totalQuestions={tag.totalQuestions} showCount/>
          ))} */}
        </div>
      </div>
    </section>
  );
}
