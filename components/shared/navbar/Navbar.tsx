import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Theme from "../Theme";
import MobileNavbar from "./MobileNavbar";
import GlobalSearch from "../search/GlobalSearch";

export default function Navbar() {
  return (
    <nav className="fixed flex-between background-light900_dark200 z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow"
        />
        <p className="h2-bold ml-2 text-dark100_light900 font-mono max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme/>
        {<SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'w-7 h-7'
              },
              variables: {
                colorPrimary: "#ff7000"
              }
            }}
          />  
        </SignedIn>}
        <MobileNavbar />
      </div>
    </nav>
  );
}
