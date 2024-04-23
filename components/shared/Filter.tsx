"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

export default function Filter({
  filters,
  otherClasses,
  containerClasses,
}: Props) {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-light-900 dark:bg-dark-200">
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value} className="text-dark100_light900 dark:bg-dark-200 focus:dark:bg-dark-400 dark:hover:bg-dark-400 hover:bg-light-800  focus:bg-light-800">
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
