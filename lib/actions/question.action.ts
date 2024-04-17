"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams){
  try {
    connectToDatabase();

    const questions = await Question.find({})
    .populate({path: 'tags', model: Tag})
    .populate({path: 'author', model: User})
    .sort({createdAt: -1}) // sorting from the new to old base on the time | 1 measn from old to new
    console.log(`The Server (action) get's ${questions.length} question/s`)
    return {questions};
  } catch (error) {
    console.log("getting question from mongodb operation failed");
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create a question using Question model . create method and pass all the data
    const question = await Question.create({
      title,
      content,
      author
    });

    console.log("question created... | title:", title);
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



    revalidatePath(path) // to render that new question without reloading the page

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log("question didn't created")
  }
}