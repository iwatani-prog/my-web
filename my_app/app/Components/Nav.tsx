"use client"


import { TiHome } from "react-icons/ti";
import { IoIosMail } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";



export default function Nav() {
    const router = useRouter();
    const pathname = usePathname();

    const menuNav =[

        {
            name:"Home",
            icon: <TiHome/>,
            path: "/"
        },
        {
            name:"Contact",
            icon: <IoIosMail/>,
            path: "/Contact"
        },
        {
            name:"About",
            icon: <RiTeamFill/>,
            path: "/About"
        },
    ]

const handleClick = ()=>{
  router.push('/Auth/SignInAndUp')
}

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-[50px] shadow-md bg-white p-3">
      <div className="w-full h-full flex items-center justify-between">
        <ul className="flex items-center gap-5">
          {menuNav.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className={`flex items-center gap-2 text-[14px] ${pathname === item.path ? "text-red-700" : "text-gray-700 hover:text-red-500"}`}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={handleClick} className="ml-auto">
          <div className="bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer p-2 rounded-full flex items-center justify-center">
            <FaUser />
          </div>
        </button>
      </div>
    </nav>
  );
}


