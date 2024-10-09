import { typeLink } from '@/types'
import { NavLink } from 'react-router-dom'

type Props = typeLink

export default function LinkHeader({Icon,href,name}:Props) {
    return (
        <li>
            <NavLink className={({ isActive }) => `flex gap-3 p-2 rounded-md hover:bg-primary/5 hover:text-primary/70 transition-all  items-center  duration-300 cursor-pointer ${isActive && 'text-primary'}`}
                to={`/${href}`}>
                <Icon width={22} height={22} />
                <span className="md:hidden">{name}</span>
            </NavLink>
        </li>
    )
}
