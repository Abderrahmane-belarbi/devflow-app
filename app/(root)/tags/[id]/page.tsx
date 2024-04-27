import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { IQuestion } from "@/database/question.model";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

export default async function Page({params, searchParams}: URLProps) {
  
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q
  })
  return <>
  <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
  <div className="mt-11 w-full">
    <LocalSearchbar
      otherClasses="flex-1"
      route="/"
      iconPosition="left"
      imgSrc="/assets/icons/search.svg"
      placeholder="Search questions..."
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
        title="There's no tag question to show"
        description="You haven't added any questions to your collection yet. Start exploring and save question that pique your interest. Click on the star icon."
        link="/"
        linkTitle="Let's Go"
      />
    )}
  </div>
</>;
}
