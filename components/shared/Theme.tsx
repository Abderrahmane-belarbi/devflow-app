"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

export default function Theme() {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "dark" ? (
            <Image
              src="/assets/icons/moon.svg"
              alt="sun"
              height={20}
              width={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/sun.svg"
              alt="moon"
              height={20}
              width={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 bg-light-900 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item) => (
            <MenubarItem
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400 focus:bg-light-800"
              key={item.value}
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                className={`${mode === item.value && "active-theme"}`}
                src={item.icon}
                alt={item.value}
                width={18}
                height={18}
              />
              <p
                className={`body-semibold ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
