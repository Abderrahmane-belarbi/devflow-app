"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params

    const user = await User.findById(userId)

    if(!user){console.log("USER NOT FOUND TO GET IT'S TAGS")}

    // Find interaction for the user and groupe by tags... 

    return [{_id: '1', name: 'tag1'}, {_id: '2', name: 'tag2'}, {_id: '3', name: 'tag3'}]

  } catch (error) {
    console.log("NO TAGS FOUND");
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams){
  try {
    connectToDatabase();

    const tags = await Tag.find({})
      .sort({createdAt: -1})
    return {tags};

  } catch (error) {
    console.log('--------------------')
    console.log("COULD'N___GET___TAGS");
    console.log('--------------------')
    throw error;
  }
}