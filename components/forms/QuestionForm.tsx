"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { questionSchema } from "@/lib/validation";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  type?: string;
  questionDetails?: string;
  mongoUserId: string;
}

export default function QuestionForm({
  mongoUserId,
  type,
  questionDetails,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  let parsedQuestionDetails: any;
  if (questionDetails && questionDetails.trim() !== "") {
    parsedQuestionDetails = JSON.parse(questionDetails);
  } else {
    parsedQuestionDetails = {
      _id: null,
      title: null,
      explanation: null,
      tags: null,
    };
  }
  //const parsedQuestionDetails = JSON.parse(questionDetails || '');
  const groupedTags = parsedQuestionDetails?.tags?.map((tag: any) => tag.name);

  const editorRef = useRef(null);
  const { mode } = useTheme();
  const [tags, setTags] = useState(groupedTags || []);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [tagError, setTagError] = useState("");
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: parsedQuestionDetails.title || "",
      explanation: parsedQuestionDetails.content || "",
      tags: groupedTags || [], // im working with setTags not this line
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof questionSchema>) {

    if (tags.length < 1) {
      setTagError("Add one tag at least");
    } else if (values.title.length < 5 ) {
      setTitleError("The Title should be at least 5 characters");
    } else if (values.explanation.length < 10) {
      setContentError("The Question details should be at least 10 characters");
    } else {
      setIsSubmitting(true);
      try {
        if (type === "edit") {
          await editQuestion({
            questionId: parsedQuestionDetails._id,
            title: values.title,
            content: values.explanation,
            path: pathname,
          });
          router.push(`/question/${parsedQuestionDetails._id}`);
        } else {
          await createQuestion({
            title: values.title,
            content: values.explanation,
            tags: tags,
            author: JSON.parse(mongoUserId),
            path: pathname,
          });
          // navigate to home
          router.push("/");
        }
      } catch (error) {
        console.log("Creating question failed..");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tags.length < 3) {
          if (tagValue.length > 20) {
            setTagError("Tag must be less then 13 characters.");
          } else if (!tags.includes(tagValue as never)) {
            setTags([tagValue as never, ...tags]);
            tagInput.value = "";
            setTagError("");
          }
        } else {
          setTagError("3 Tags at Maximum");
        }
      }
    } else {
      form.trigger();
    }
  }

  function handleOnDeleteTag(wantedToDeleteTag: string) {
    const tempTags = tags;
    tags.map((currentTag: any) => {
      if (currentTag === wantedToDeleteTag) {
        const index = tags.indexOf(currentTag);
        tempTags.splice(index, 1);
        setTags([...tempTags]);
        if (tags.length < 3) {
          setTagError("");
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/*-----------------------------------   Question Title  -----------------------------------*/}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 text-dark300_light700 light-border-2 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you're asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/*-----------------------------------  Explanation input  -----------------------------------*/}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of you'r problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* Question explination input */}
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={parsedQuestionDetails.content || ""}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | codesample | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Maximum 1000 character
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/*-----------------------------------  TAGS input  -----------------------------------*/}
        <div className="flex w-full flex-col gap-3">
          <p className="paragraph-semibold text-dark400_light800">Tags</p>
          <input
            type="text"
            placeholder="Add tag..."
            disabled={type === "edit"}
            onKeyDown={(e) => handleInputKeyDown(e)}
            className={`${type === 'edit' ? 'cursor-not-allowed' : ''} p-2 outline-none no-focus paragraph-regular background-light900_dark300 text-dark300_light700 light-border-2 min-h-[56px] border`}
          />
          <p className="font-medium text-[0.8rem] text-red-500">{tagError}</p>
          <div className="flex  gap-4">
            {tags.map((tag: any) => (
              <Badge
                key={tag}
                className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
              >
                {tag}
                {type !== 'edit' &&
                (
                  <Image
                    className="cursor-pointer object-contain invert-0 dark:invert"
                    src="assets/icons/close.svg"
                    alt="delete-icon"
                    onClick={() => handleOnDeleteTag(tag)}
                    width={12}
                    height={12}
                  />
                )}
              </Badge>
            ))}
          </div>
          <p className="body-regular mt-2.5 text-light-500">
            Add up to 3 tags to describe what your question is about. You need
            to press enter to add a tag.
          </p>
        </div>
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
          onClick={() => {
            onSubmit(form.getValues());
          }}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
