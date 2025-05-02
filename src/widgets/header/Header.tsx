import { Bell, Settings, ChevronDown } from "lucide-react";

import Logo from "../../shared/assets/mini_logo.svg";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../shared/ui/dropdown-menu";

interface IHeader {
  username?: string;
  onLogout?: () => void;
}

const Header = ({ username = "t.testov", onLogout }: IHeader) => {
  return (
    <header className="bg-[#006EEF] text-white flex items-center justify-between px-10 py-2 shadow-md h-[80px]">
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="Bank Logo" className="h-10" />
        <h2 className="text-lg font-bold uppercase tracking-wide">
          Система регистрации залогов
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition">
          <Settings className="h-5 w-5" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-1 text-sm font-medium hover:bg-white/10 rounded px-2 py-1 transition">
              <span>{username}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
