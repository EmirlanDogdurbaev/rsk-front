import { NavLink } from "react-router-dom";

export const SidebarLink: React.FC<{
  to: string;
  children: React.ReactNode;
}> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-2 rounded-md transition ${
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    {children}
  </NavLink>
);
