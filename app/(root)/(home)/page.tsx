import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/card/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";


export default async function Home() {

  // ______________getting question from the mongo database___________________
  const result = await getQuestions({})
  //__________________________________________________________________________
  return (
    <>
      {/*  HEADER: ALL QUESTION              +                BUTTON */}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
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
        {result && result.questions && result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
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
