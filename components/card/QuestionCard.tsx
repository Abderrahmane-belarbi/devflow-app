import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface Props {
  _id: number;
  title: string;
  tags?: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: number;
    name: string;
    picture: string;
  };
  href: string;
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

export default function QuestionCard({
  _id,
  title,
  tags,
  author,
  href,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) {

  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* if signed in add edit delete actions */}
      </div>

      {/* RENDERING TAGS */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      {/*  */}
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        {/* Author information (Picture and name) */}

        <Metric
          icon={author.picture}
          alt="user"
          value={author.name}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${href}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />

        {/* LIKES AND VIEWS AND ANSWERS */}
        <div className="flex items-center gap-3">
          <Metric
            icon="/assets/icons/like.svg"
            alt="upvotes"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            icon="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
            textStyle="small-medium text-dark400_light800"
          />
          <Metric
            icon="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
}
