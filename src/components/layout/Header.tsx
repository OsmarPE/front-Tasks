import { DashboardIcon } from "@radix-ui/react-icons";
import { BoxIcon, LogOutIcon } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import { NavLink } from "react-router-dom";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const links: { href: string, Icon: ForwardRefExoticComponent<any> }[] = [
  {
    href: 'main/projects',
    Icon: DashboardIcon
  },
  {
    href: 'main/list',
    Icon: BoxIcon
  },
  {
    href: 'logout',
    Icon: LogOutIcon
  },
]

export default function Header() {
  return (
    <aside className="h-dvh hidden md:flex items-center justify-center border-r border-secondary">
      <nav className="">
        <ul className="grid gap-2 text-gray-300">
          {
            links.map(({ Icon, href },index) => (
              <li key={index}>
                <NavLink key={index}  className={({isActive}) => `block p-2 rounded-md hover:bg-primary/5 hover:text-primary/70 transition-all  duration-300 cursor-pointer ${isActive && 'text-primary'}` }
                  to={`/${href}`}>
                  <Icon width={22} height={22} />
                </NavLink>
              </li>

            ))
          }
        </ul>
      </nav>
    </aside>
  )
}
