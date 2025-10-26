import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Building2, Menu, X, LogOut, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const links = isAuthenticated
    ? [
        { id: crypto.randomUUID(), title: "Home", to: "/" },
        { id: crypto.randomUUID(), title: "Dashboard", to: "/dashboard" },
      ]
    : [
        { id: crypto.randomUUID(), title: "Home", to: "/" },
        { id: crypto.randomUUID(), title: "Sign In", to: "/auth/signin" },
        { id: crypto.randomUUID(), title: "Sign Up", to: "/auth/signup" },
      ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <Building2 className="text-blue-600 w-6 h-6" />
          <span className="font-semibold text-lg">StayEase</span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="lg:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <Menu className="!w-6 !h-6" />
        </Button>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}

          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer bg-white">
                  <Avatar>
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 text-sm"
                  >
                    <LayoutGrid size={16} /> Dashboard
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className="flex items-center gap-2 text-red-600 cursor-pointer"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>

      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 text-lg font-semibold transition-all duration-300 lg:hidden ${
          openMenu
            ? "opacity-100 z-50 pointer-events-auto"
            : "opacity-0 -z-10 pointer-events-none"
        }`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-6 right-6"
          onClick={() => setOpenMenu(false)}
        >
          <X className="!w-6 !h-6" />
        </Button>

        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              } text-lg font-medium transition-colors duration-200`
            }
          >
            {link.title}
          </NavLink>
        ))}

        {isAuthenticated && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              dispatch(logout());
              setOpenMenu(false);
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
