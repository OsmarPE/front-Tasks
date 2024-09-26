import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "sonner";
import { ModeToggle } from "../mode-toggle";
import { Blocks, Library, Menu } from "lucide-react";

export default function Layout() {
  return (
    <div className="grid md:grid-cols-[5rem_1fr]">
        <Header/>
        <div>
          <div className="h-16 py-4 px-6 border-b border-b-secondary">
          
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="md:hidden">
                  <Menu width={24} height={24} className="text-primary"/>
                </button>
                  <div className="hidden md:flex uppercase text-sm tracking-[3px] text-primary items-center gap-1">
                      <Library width={18} height={18}/>
                      TaskOs
                  </div>
              </div>
              <ModeToggle/>
            </div>
          </div>
          <div className="p-6">
              <Outlet/>
          </div>
        </div>
        <Toaster position="top-right" duration={3000}/>
    </div>
  )
}
