import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

export default async function Page() {

  const result = await getAllUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          otherClasses="flex-1"
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for user..."
        />
        {/* Filter> ITS THE DROP DOWN SELECT APPREAR IN TABLET AND SMALL SCREEN LIKE MOBILES  */}
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark-200_light800 mx-auto max-w-4xl text-center">
            <p className="mb-3 font-bold text-slate-700 dark:text-slate-700">No users</p>
            <Link href="/sign-up" className=" font-bold text-yellow-600 border rounded-lg  border-yellow-600 px-4 py-2">
              Join now!
            </Link>
          </div>
        )}
      </section>
    </>
  );
}