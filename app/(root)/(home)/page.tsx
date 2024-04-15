import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/card/QuestionCard";

const questions = [
  {
    _id: 1,
    title: "How do I create a responsive design with CSS grid?",
    tags: [
      { _id: 1, name: "CSS" },
      { _id: 2, name: "ResponsiveDesign" },
    ],
    author: { _id: 1, name: "Alice Smith", picture: "randomlink.com/alice.jpg" },
    upvotes: 15,
    views: 50,
    answers: [],
    createdAt: new Date("2023-10-15"),
  },
  {
    _id: 2,
    title: "What are the best practices for securing a Node.js application?",
    tags: [
      { _id: 1, name: "Node.js" },
      { _id: 2, name: "Security" },
    ],
    author: { _id: 2, name: "Bob Johnson", picture: "randomlink.com/bob.jpg" },
    upvotes: 20,
    views: 65,
    answers: [],
    createdAt: new Date("2024-04-14"),
  },
  {
    _id: 3,
    title: "How can I optimize my website's performance for mobile devices?",
    tags: [
      { _id: 1, name: "WebPerformance" },
      { _id: 2, name: "Mobile" },
    ],
    author: { _id: 3, name: "Ivy Chen", picture: "randomlink.com/ivy.jpg" },
    upvotes: 12,
    views: 40,
    answers: [],
    createdAt: new Date("2024-01-10"),
  },
  {
    _id: 4,
    title: "What are the differences between Git and SVN?",
    tags: [
      { _id: 1, name: "Git" },
      { _id: 2, name: "SVN" },
    ],
    author: { _id: 4, name: "Charlie Brown", picture: "randomlink.com/charlie.jpg" },
    upvotes: 18,
    views: 55,
    answers: [],
    createdAt: new Date("2024-03-25"),
  },
  {
    _id: 5,
    title: "How do I implement OAuth 2.0 authentication in my application?",
    tags: [
      { _id: 1, name: "OAuth" },
      { _id: 2, name: "Authentication" },
    ],
    author: { _id: 5, name: "David Lee", picture: "randomlink.com/david.jpg" },
    upvotes: 25,
    views: 70,
    answers: [],
    createdAt: new Date("2024-02-12"),
  },
  {
    _id: 6,
    title: "What are the benefits of using React hooks?",
    tags: [
      { _id: 1, name: "React" },
      { _id: 2, name: "Hooks" },
    ],
    author: { _id: 6, name: "Emily Wang", picture: "randomlink.com/emily.jpg" },
    upvotes: 30,
    views: 80,
    answers: [],
    createdAt: new Date("2024-04-08"),
  },
  {
    _id: 7,
    title: "How can I improve my website's SEO?",
    tags: [
      { _id: 1, name: "SEO" },
      { _id: 2, name: "SearchEngineOptimization" },
    ],
    author: { _id: 7, name: "Grace Brown", picture: "randomlink.com/grace.jpg" },
    upvotes: 22,
    views: 60,
    answers: [],
    createdAt: new Date("2024-04-15"),
  },
  {
    _id: 8,
    title: "What are the differences between SQL and NoSQL databases?",
    tags: [
      { _id: 1, name: "SQL" },
      { _id: 2, name: "NoSQL" },
    ],
    author: { _id: 8, name: "Frank Miller", picture: "randomlink.com/frank.jpg" },
    upvotes: 28,
    views: 75,
    answers: [],
    createdAt: new Date("2024-03-20"),
  },
  {
    _id: 9,
    title: "How do I deploy a Flask application to Heroku?",
    tags: [
      { _id: 1, name: "Flask" },
      { _id: 2, name: "Heroku" },
    ],
    author: { _id: 9, name: "Henry Johnson", picture: "randomlink.com/henry.jpg" },
    upvotes: 19,
    views: 45,
    answers: [],
    createdAt: new Date("2024-01-05"),
  },
  {
    _id: 10,
    title: "What are the key features of ES6?",
    tags: [
      { _id: 1, name: "ES6" },
      { _id: 2, name: "JavaScript" },
    ],
    author: { _id: 10, name: "Jack Davis", picture: "randomlink.com/jack.jpg" },
    upvotes: 17,
    views: 48,
    answers: [],
    createdAt: new Date("2023-11-20"),
  },
];

export default function Home() {
  return (
    <>
      {" "}
      {/*  HEADER: ALL QUESTION              +                BUTTON */}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-questions">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          otherClasses="flex-1"
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
        />
        {/* Filter> ITS THE DROP DOWN SELECT APPREAR IN TABLET AND SMALL SCREEN LIKE MOBILES  */}
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      {/* HomeFilters> THE BARE APPEARS IN THE LARGER SCREEN:  Newest   Recommended   Frequent   Unanswered */}
      <HomeFilters />
      {/* LOOPING THROGH QUESTION LIST */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! Ask a question and kickstart the discussion. our query could be the next big thing others learn from. Get involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
