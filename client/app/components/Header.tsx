"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";

import { toast } from "react-toastify";
import { FaBtc, FaSignOutAlt } from "react-icons/fa";
import { logoutAction } from "../actions";

const navLinks = [
  { href: "/transactions", name: "Transactions" },
  { href: "/categories", name: "Categories" },
];

const Header: FC = () => {
  const { isAuth, logout } = useAuthStore((state) => state);

  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = () => {
    logout();
    logoutAction();
    toast.success("You logged out");
    router.push("/auth");
  };

  return (
    <header className="flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
      <Link href="/">
        <FaBtc size={20} />
      </Link>

      {/* Menu */}
      {isAuth && (
        <section className="mr-10 ml-auto">
          <ul className="flex items-center gap-5">
            {navLinks.map(({ href, name }) => (
              <li key={name}>
                <Link
                  className={pathname === href ? "text-white" : "text-white/50"}
                  href={href}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Actions */}
      {isAuth ? (
        <button
          className="btn btn-red flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-800"
          onClick={logoutHandler}
        >
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          className="ml-auto py-2 text-white/50 hover:text-white"
          href={"/auth"}
        >
          Log In / Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
