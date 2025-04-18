import { MainNav } from "../ui/MainNav";
import { DirectoryNav } from "../ui/DirectoryNav";

export const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white/80 shadow-md flex flex-col h-screen">
    <div className="px-6 py-4">
      <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">
        Страницы
      </h2>
    </div>
    <nav className="flex-1 px-4 py-2">
      <MainNav />
      <DirectoryNav />
    </nav>
  </aside>
);
