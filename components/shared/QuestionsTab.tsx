import { getUserQuestionsProfile } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../card/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

export default async function QuestionsTab({
  userId,
  clerkId,
  searchParams,
}: Props) {
  const result = await getUserQuestionsProfile({ userId, page: 1 });

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId!}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
}
