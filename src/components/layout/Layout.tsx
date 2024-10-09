import {  Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "sonner";
import { ModeToggle } from "../mode-toggle";
import {  Library } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { ShowMenuProvider } from "@/context/ShowMenu";
import ButtonCloseMenu from "../buttons/ButtonCloseMenu";

export default function Layout() {
  return (
    <div className="grid md:grid-cols-[5rem_1fr]">
      <ShowMenuProvider>
              <Header />
              <ButtonCloseMenu/>
      </ShowMenuProvider>
      <div>
        <div className="h-16 py-4 px-6 border-b border-b-secondary">

          <div className="flex items-center justify-end md:justify-between">
            <div className="flex items-center gap-2">
              <div className="hidden md:flex uppercase text-sm tracking-[3px] text-primary items-center gap-1">
                <Library width={18} height={18} />
                TaskOs
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" duration={3000} />
    </div>
  )
}
