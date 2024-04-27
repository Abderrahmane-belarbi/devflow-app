import { getUserAnswersProfile } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../card/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

export default async function AnswersTab({ userId, clerkId, searchParams }: Props) {

  const result = await getUserAnswersProfile({
    userId,
    page: 1
  })
  return <>
    {result.answers.map((answer) => (
      <AnswerCard
        key={answer._id}
        clerkId={clerkId}
        _id={answer._id}
        question={answer.question}
        author={answer.author}
        upvotes={answer.upvotes.length}
        createdAt={answer.createdAt}
      />
    ))}
  </>;
}
