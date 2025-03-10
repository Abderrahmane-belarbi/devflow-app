"use client"

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

export default function HomeFilters(){
    const active = 'newest';
    return <div className="mt-10 hidden flex-wrap gap-3 md:flex">
        {HomePageFilters.map((filter) => (
            <Button
                className={`body-medium rounded-lg px-6 py-3
                capitalize shadow-none ${active === filter.value ?
                ' text-primary-500 bg-light-900 dark:bg-dark-400' :
                'dark:text-light-500 bg-light-800 text-light-500  dark:bg-dark-300 '}`}
                key={filter.value} onClick={()=>{}}
            >
                {filter.name}
            </Button>
        ))}
    </div>
}