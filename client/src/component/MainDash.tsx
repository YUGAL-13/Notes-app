import { useState } from "react";
import MainContent, { type NoteCounts } from "./MainContent";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function MainDash() {
  const [activeCategory, setActiveCategory] = useState("All Notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 1. Mobile sidebar state
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});


  const [counts, setCounts] = useState<NoteCounts>({
    all: 0,
    pinned: 0,
    archive: 0,
    trash: 0,
  });


  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* 2. Dark Overlay Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* 3. Responsive Sidebar (Slide-out drawer on mobile, static on desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <SideBar
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setIsSidebarOpen(false); // Close drawer when category clicked on mobile
          }}
          counts={counts}
          tagCounts={tagCounts}

        />
      </aside>

      {/* 4. Main Right Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Fixed Top Navbar */}
        <header className="shrink-0 border-b border-slate-200 bg-white">
          <Navbar
            onCreateNote={() => setIsCreateOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={(query) => setSearchQuery(query)}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} // Pass toggle function
          />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-6">
          <MainContent
            activeCategory={activeCategory}
            isCreateOpen={isCreateOpen}
            onCloseCreate={() => setIsCreateOpen(false)}
            onCountsChange={(newCounts) => setCounts(newCounts)}
            onTagCountsChange={setTagCounts}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
}