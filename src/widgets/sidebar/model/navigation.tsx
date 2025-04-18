import { NavItemProps, SubNavItemProps } from "../types";
import {
  Database,
  FileText,
  User,
  Users,
  Clock,
  RefreshCw,
} from "lucide-react";

export const MAIN_NAV_ITEMS: NavItemProps[] = [
  {
    name: "Залог",
    icon: <Database className="h-5 w-5" />,
    path: "/collateral",
  },
  {
    name: "Договора",
    icon: <FileText className="h-5 w-5" />,
    path: "/contracts",
  },
  {
    name: "Заемщики",
    icon: <User className="h-5 w-5" />,
    path: "/borrowers",
  },
  {
    name: "Залогодатели",
    icon: <Users className="h-5 w-5" />,
    path: "/pledgors",
  },
  {
    name: "История запросов в Кадастр",
    icon: <Clock className="h-5 w-5" />,
    path: "/collateral-history",
  },
  {
    name: "История изменений",
    icon: <RefreshCw className="h-5 w-5" />,
    path: "/change-history",
  },
];

export const DIRECTORY_ITEMS: SubNavItemProps[] = [
  { name: "Залогодержатели", path: "/directory/pledgors" },
  { name: "Предмет залога", path: "/directory/collateral-items" },
  { name: "Статус договора", path: "/directory/contract-status" },
  { name: "Области", path: "/directory/regions" },
  { name: "Районы", path: "/directory/districts" },
];
