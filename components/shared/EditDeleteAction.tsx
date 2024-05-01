"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}
export default function EditDeleteAction({ type, itemId }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  
  console.log('itemId: ',itemId)
  async function handleEdit() {
    router.push(`/question/edit/${JSON.parse(itemId)}`)
  }
  async function handleDelete() {
    if (type === "question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === "answer") {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
      
    } else {
      throw new Error('Please Enter a valid Type "question" | "answer"');
    }
  }

  return (
    <div className="flex items-center justify-end gap-6 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={20}
        height={20}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
}
