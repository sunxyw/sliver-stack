import logoImage from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-full">
      <nav className="border-b border-gray-dim bg-gray-app">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src={logoImage}
                  className="block h-8 w-auto lg:hidden dark:invert"
                />
                <img
                  alt="Your Company"
                  src={logoImage}
                  className="hidden h-8 w-auto lg:block dark:invert"
                />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/"
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    "text-gray-dim hover:text-gray-normal",
                  )}
                >
                  Home
                </a>
              </div>
              <div className="flex flex-1 items-center px-2 lg:mx-6">
                <Input type="search" placeholder="Search" variant="soft">
                  <Input.Icon side="left">
                    <SearchIcon />
                  </Input.Icon>
                </Input>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="space-x-2">
                <Button variant="soft">Sign Up</Button>
                <Button variant="soft">Sign In</Button>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden" />
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
