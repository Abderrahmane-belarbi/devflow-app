"use client";

import { AnswerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { FormField } from "../ui/form";
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function AnswerForm() {
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  function handleCreateAnswer(){

  }

  const editorRef = useRef(null);
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mt-6">
        <h4 className="paragraph-semibold">
          Write your answer here
        </h4>

        <Button 
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={()=>{}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="ai"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>
    
    </div>
  );
}
