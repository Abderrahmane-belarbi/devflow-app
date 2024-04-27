"use server"

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  let existingInteration;
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    

    // check for existing interaction, means if the user already viewed the question
    if (userId) {
      const existingInteration = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId,
      })
      if (existingInteration) return console.log('User Already has viwed the question');
      // other wise we create an interation
      await Interaction.create({
        user: userId,
        action: 'view',
        question: questionId,
      })
    }

    if (!existingInteration) {
      // update viwe count for question
      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } }) // increment by 1
    }
  } catch (error) {
    console.log('-------------------------')
    console.log('VIEW___OPERATION___FAILED')
    console.log('-------------------------')
    throw error;
  }
}