"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params

    const user = await User.findById({userId})

    if(!user){console.log("USER NOT FOUND TO GET IT'S TAGS")}

    // Find interaction for the user and groupe by tags... 

    return ['tag1', 'tag2', 'tag3']

  } catch (error) {
    console.log("NO TAGS FOUND");
    throw error;
  }
}
