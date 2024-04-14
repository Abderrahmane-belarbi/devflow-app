"use client"

import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
  otherClasses?: string;
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
}

export default function LocalSearchbar({
  otherClasses,
  route,
  iconPosition,
  imgSrc,
  placeholder,
}: Props) {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          className="cursor-pointer"
          src={imgSrc}
          alt="search-icon"
          width={24}
          height={24}
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={()=>{}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          className="cursor-pointer"
          src={imgSrc}
          alt="search-icon"
          width={24}
          height={24}
        />
      )}
    </div>
  );
}
