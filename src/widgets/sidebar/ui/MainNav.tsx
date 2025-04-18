import { MAIN_NAV_ITEMS } from "../model/navigation";
import { SidebarLink } from "./SidebarLink";

export const MainNav: React.FC = () => (
  <ul className="space-y-1">
    {MAIN_NAV_ITEMS.map(({ name, icon, path }) => (
      <li key={path}>
        <SidebarLink to={path}>
          <span className="text-blue-600">{icon}</span>
          <span className="text-sm">{name}</span>
        </SidebarLink>
      </li>
    ))}
  </ul>
);
