"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";


export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });
    
    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id}
    })

    // TODO: Add interaction...

    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export default async function getAnswers(params: GetAnswersParams){
  try {

    connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({question: questionId})
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 })
    
    console.log(`GET'S ${(await answers).length} ANSWERS`);
    return  {answers};
    
  } catch (error) {
    console.log("--------------------------")
    console.log("GETTING___ANSWERS___FAILED")
    console.log("--------------------------")
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams){
  try {
    // connecting to database
    connectToDatabase();

    const { answerId, userId, hasAlreadyUpvoted, hasAlreadyDownvoted, path} = params;

    let updateQuery = {};

    if (hasAlreadyUpvoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasAlreadyDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });
    if (!answer) {
      throw new Error('Answer not found')
    }

    // increment author's reputation by +score

    revalidatePath(path)

  } catch (error) {
    console.log('---------------------------')
    console.log("UPVOTE___OPERATION___FAILED")
    console.log('---------------------------')
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams){
  try {
    // connecting to database
    connectToDatabase();

    const {answerId, userId, hasAlreadyUpvoted, hasAlreadyDownvoted, path} = params;

    let updateQuery = {};

    if (hasAlreadyDownvoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasAlreadyUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });
    if (!answer) {
      throw new Error('Anser not found')
    }

    // decrement author's reputation by -score

    revalidatePath(path)

  } catch (error) {
    console.log('---------------------------')
    console.log("DOWNVOTE___OPERATION___FAILED")
    console.log('---------------------------')
    throw error;
  }
}