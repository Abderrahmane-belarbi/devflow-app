import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

export default function RightSidebar() {
  const hotQestions = [
    {
      _id: 1,
      title:
        "What are some effective strategies for managing dependencies in a large-scale software project?",
    },
    {
      _id: 2,
      title:
        "What are some best practices for optimizing database queries in SQL? ",
    },
    {
      _id: 3,
      title:
        "How can I efficiently handle authentication and authorization in a web application?",
    },
    {
      _id: 4,
      title:
        "What are some common pitfalls to avoid when writing asynchronous JavaScript code?",
    },
    {
      _id: 5,
      title:
        "How do you approach debugging and troubleshooting issues in a complex software system?",
    },
    {
      _id: 6,
      title:
        "What strategies can be employed to improve the performance of a RESTful API?",
    },
  ];
  const popularTags = [
    {_id: '1', name: 'HTML', totalQuestions: 10},
    {_id: '2', name: 'Python', totalQuestions: 15},
    {_id: '3', name: 'CSS', totalQuestions: 8},
    {_id: '4', name: 'Java', totalQuestions: 12},
    {_id: '5', name: 'C++', totalQuestions: 9},
    {_id: '6', name: 'JavaScript', totalQuestions: 20},
    {_id: '7', name: 'SQL', totalQuestions: 14},
  ]
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
              href={`/questions${question._id}`}
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
          {popularTags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} totalQuestions={tag.totalQuestions} showCount/>
          ))}
        </div>
      </div>
    </section>
  );
}
