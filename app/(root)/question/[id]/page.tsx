import ParseHTML from "@/components/ParseHTML";
import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import RenderTag from "@/components/shared/RenderTag";
import SignInToAnswer from "@/components/shared/SignInToAnswer";
import Votes from "@/components/shared/Votes";
import getAnswers from "@/lib/actions/answer.action";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({ params, searchParams }: any) {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();

  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          {/*      display the author's picture and name          */}
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            {/*          display the author's picture          */}
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            {/*     display the author's name       */}
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          
          {/*           UP VOTES    DOWN VOTES     SAVE TO COLLECTION         */}
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={result.upvotes.length}
              hasAlreadyUpvoted={result.upvotes.includes(mongoUser?._id)}
              downvotes={result.downvotes.length}
              hasAlreadyDownvoted={result.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        {/*     QUESTION TITLE      */}
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      {/*         TIME ASKED AGO        NUMBER OF ANSWERS        NUMBER OF VIWES         */}
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title=" Asked"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          icon="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          icon="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title=" Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
      {/*      PARSING THE DETALED QUESTION TO HTML AND DISPLAY IT        */}
      <ParseHTML data={result.content} />
      {/*         DISPLAYING TAGS         */}
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      {/*       DISPLAYING ALL ANSWERS OF THE QUESTION        */}
      <AllAnswers
        questionId={result._id}
        userId={mongoUser?._id}
        totalAnswers={result.answers.length}
      />
      {/*       ANSWER FORM        */}
      <AnswerForm
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser?._id)}
        userId={clerkId!}
      />

      <SignInToAnswer
        questionId={JSON.stringify(result._id)}
        userId={clerkId!}
      />
    </>
  );
}
