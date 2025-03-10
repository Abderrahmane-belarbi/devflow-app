"use server";

import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("---------- USER NOT FOUND! ----------");
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // get user question ids
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    // Delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc

    // Finally, delete the user
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    //const {page=1, pageSize=20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log("COULD'N GET USERS");
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {  };
    
    const user = await User.findOne( { clerkId } )
      .populate({
        path: 'saved',
        match: query,
        options: {
          sort: { createdAt: -1 },
        },
        populate: [
          { path: 'tags', model: Tag, select:  '_id name'},
          { path: 'author', model: User, select:  '_id clerkId name picture'}
        ]
      })
    
      if(!user) {
        throw new Error('USER___NOT___FOUND');
      }
      const savedQuestion = user.saved;
    return { questions: savedQuestion }
  } catch (error) {
    console.log("COULD'T___FOUND___SAVED___QUESTION");
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId })

    if(!user) {
      throw new Error("User Not Found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id })

    return {user, totalQuestions, totalAnswers}
    
  } catch (error) {
    console.log("------------------------------")
    console.log("GETTING___USER___INFO___FAILED")
    console.log("------------------------------")
  }
}

export async function getUserQuestionsProfile(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const {userId, page=1, pageSize=20 } = params;
    const totalQuestions = await Question.countDocuments({ author: userId })
    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log("COULD'N GET USERS");
    throw error;
  }
}

export async function getUserAnswersProfile(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const {userId, page=1, pageSize=20 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId })
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture')

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log("COULD'N GET USERS");
    throw error;
  }
}