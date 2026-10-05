import { Search, Plus, Menu, X } from "lucide-react";

interface NavbarProps {
  onCreateNote?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onToggleSidebar?: () => void; // 1. Define callback prop
}

export default function Navbar({
  onCreateNote,
  searchQuery,
  onSearchChange,
  onToggleSidebar, // 2. Receive callback prop
}: NavbarProps) {
  return (
    <div className="flex px-6 py-4">
      <div className="flex justify-between items-center w-full gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="flex lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-2.5 w-full max-w-96 h-10 px-3.5 rounded-xl bg-slate-100 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent outline-none border-none text-sm text-slate-800 placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange?.("")}
              className="  text-slate-400 hover:text-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* New Note Button */}
        <button
          onClick={onCreateNote}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">New Note</span>
        </button>
      </div>
    </div>
  );
}