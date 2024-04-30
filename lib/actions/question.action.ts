"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create a question using Question model . create method and pass all the data
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    // create a tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    revalidatePath(path); // to render that new question without reloading the page

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log("----------- QUESTION NOT CREATED ----------");
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 }); // sorting from the new to old base on the time | 1 measn from old to new
    console.log(`THE SERVER GET'S ${questions.length} QUESTION/s`);
    
    return { questions };
  } catch (error) {
    console.log("---------------------------------------------");
    console.log("GETTING___QUESTION___FROM___MONGO_DB___FAILED.");
    console.log("---------------------------------------------");
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    // connecting to database
    connectToDatabase();

    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log("--------------------------------------");
    console.log("COULDN'T___FIND___QUESTION___BY___ID");
    console.log("--------------------------------------");
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    // connecting to database
    connectToDatabase();

    const { questionId, userId, hasAlreadyUpvoted, hasAlreadyDownvoted, path } =
      params;

    let updateQuery = {};

    if (hasAlreadyUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasAlreadyDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }

    // increment author's reputation by +score

    revalidatePath(path);
  } catch (error) {
    console.log("---------------------------");
    console.log("UPVOTE___OPERATION___FAILED");
    console.log("---------------------------");
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    // connecting to database
    connectToDatabase();

    const { questionId, userId, hasAlreadyUpvoted, hasAlreadyDownvoted, path } =
      params;

    let updateQuery = {};

    if (hasAlreadyDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasAlreadyUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question not found");
    }

    // decrement author's reputation by -score

    revalidatePath(path);
  } catch (error) {
    console.log("---------------------------");
    console.log("DOWNVOTE___OPERATION___FAILED");
    console.log("---------------------------");
    throw error;
  }
}

export async function toggleSaveQuestions(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("USER___NOT___FOUND___TO___TOGGLE___SAVE___QUESTION");
    }

    const isQuestionAlreadySaved = user.saved.includes(questionId);
    if (isQuestionAlreadySaved) {
      // remove question from collection
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add question to collection
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path)
  } catch (error) {
    console.log("----------------------------------------------------------");
    console.log("ADDING___QUESTION___TO___COLLECTION___OPPERATION___FALIED.");
    console.log("----------------------------------------------------------");
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {

  try {
    connectToDatabase();
    
    const { questionId, path } = params;
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany({ question: questionId }, { $pull: { question: questionId } });

    revalidatePath(path);

  } catch (error) {
    console.log("----------------------------------");
    console.log('DELETING_QUESTION_OPERATION_FAILED');
    console.log("----------------------------------");
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, title, content, path} = params;
    const question = await Question.findById(questionId)
      .populate("tags")

      if (!question) {
        throw new Error('Question not found')
      }
      question.title = title;
      question.content = content;
      await question.save();
    } catch (error) {
    console.log("----------------------------------");
    console.log("EDITING_QUESTION_OPERATION_FAILED.");
    console.log("----------------------------------");
    throw error;
  }
}