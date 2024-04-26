import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/card/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function Home() {

  const { userId } = auth();
  if (!userId) {
    throw new Error('USER___IS___NOT___LOGGED___IN');
  }
  // ______________getting question from the mongo database___________________
  const result = await getSavedQuestions({
    clerkId: userId,
  });
  //__________________________________________________________________________
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
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
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      {/* LOOPING THROGH SAVED QUESTION LIST */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {result && result.questions && result.questions.length > 0 ? (
          result.questions.map((question: any) => (
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
            title="There's no question saved in the collection"
            description="You haven't added any questions to your collection yet. Visit the homepage to browse through existing questions and save the important ones to your collection by clicking on the star icon."
            link="/"
            linkTitle="Let's Go"
          />
        )}
      </div>
    </>
  );
}
