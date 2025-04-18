import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../shared/ui/accordion";
import { DIRECTORY_ITEMS } from "../model/navigation";
import { SidebarLink } from "./SidebarLink";

export const DirectoryNav: React.FC = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="directory" className="border-none">
      <AccordionTrigger className="flex items-center justify-start  px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition">
        <BookOpen className="h-5 w-5" />
        <span className="text-sm">Справочник</span>
      </AccordionTrigger>
      <AccordionContent className="pl-4">
        <ul className="space-y-1">
          {DIRECTORY_ITEMS.map(({ name, path }) => (
            <li key={path}>
              <SidebarLink to={path}>
                <span className="pl-7 text-sm">{name}</span>
              </SidebarLink>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
