import { Inbox, Pin, Trash, Archive } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface sidebar {
    id: number;
    icon: LucideIcon;
    label: string;
    count: number;
}
export const menuItems: sidebar[] = [
    { id: 1, icon: Inbox, label: "All Notes", count: 0 },
    { id: 2, icon: Pin, label: "Pinned", count: 0 },
    { id: 3, icon: Archive, label: "Archive", count: 0 },
    { id: 4, icon: Trash, label: "Trash", count: 0 },
];

interface tags{
    title:string;
    count:number;
    id:number;
    dotColor: string;
}
export const Taggers : tags[]=[
    { id :1, title:"Personal",count:4 ,dotColor:"bg-blue-500"},
    { id :2, title:"Work",count:3,dotColor:"bg-green-500"},
    { id :3, title:"Learning",count:3,dotColor:"bg-violet-500"},
    { id :4, title:"Ideas",count:2,dotColor:"bg-red-500"},
]


export interface NoteItem {
  id?: string | number;
  title: string;
  date: string;
  label: string;
  intro?: string;
  bullets?: string[];
  lastEdited?: string;
  notesList?: string[];
  content?: string;
  tags?: string[];
  isPinned?: boolean;
  isArchived?:boolean;
  isTrash?: boolean;
  deletedAt?: Date | null;
}

//----without API integration this values are shown in the Frontend----//
export const Listings: NoteItem[] = [
  {
    title: "Learning React",
    date: "Sep 29, 2026",
    label: "about react hooks",
    intro: "Today I learned about React hooks:",
    bullets: ["useState", "useEffect", "useContext", "useCallback", "useMemo", "useRef"],
    notesList: [
      "useState -> manages state in functional components.",
      "useEffect -> used for side effects like API calls.",
      "useContext -> for global state management.",
      "useMemo -> memoizes expensive calculations.",
      "useCallback -> memoizes callback functions to prevent re-renders."
    ],
    tags: ["React", "Frontend", "Learning"]
  },
  {
    title: "Code, Task Management",
    date: "Sep 28, 2026",
    label: "Task Management",
    content: "Organized project milestones and set up sprint tasks for next week. Reviewed PRs for authentication workflow and configured GitHub Actions CI/CD pipeline.",
    tags: ["Work", "Tasks"]
  },
  {
    title: "Tailwind CSS Layouts",
    date: "Sep 25, 2026",
    label: "Mastering Flexbox & Grid",
    intro: "Key takeaways for full-height responsive dashboard architecture:",
    bullets: [
      "Use h-screen + overflow-hidden on root wrapper",
      "Apply flex-1 + min-h-0 to scrollable body containers",
      "Use shrink-0 on fixed headers and sidebars"
    ],
    notesList: [
      "min-h-0 -> critical fix for Firefox/Chrome flex container overflow bugs.",
      "shrink-0 -> prevents header items from compressing when content grows."
    ],
    tags: ["CSS", "Tailwind", "UI/UX"]
  },
  {
    title: "TypeScript Best Practices",
    date: "Sep 21, 2026",
    label: "Type Safety Rules",
    intro: "Core guidelines for writing clean TS code across application modules:",
    bullets: ["Avoid 'any'", "Prefer Interfaces for Objects", "Use Discriminated Unions"],
    notesList: [
      "Use unknown instead of any when input shape is indeterminate.",
      "Export reusable interfaces from central type definition files.",
      "Keep component props explicitly typed."
    ],
    tags: ["TypeScript", "Frontend"]
  },
  {
    title: "Client Feedback Meeting",
    date: "Sep 18, 2026",
    label: "Design Review",
    content: "Reviewed NoteHub split-pane wireframes with product owners. Feedback highlighted adding dark mode toggle, search bar auto-complete, and quick-tagging shortcuts.",
    tags: ["Work", "Design"]
  },
  {
    title: "Database Optimization",
    date: "Sep 14, 2026",
    label: "PostgreSQL Indexing",
    intro: "Database query performance checklist:",
    bullets: ["B-Tree Indexes", "Composite Indexes", "Query Execution Plans"],
    notesList: [
      "Add indexes to foreign key columns used in frequent joins.",
      "Use EXPLAIN ANALYZE to identify slow sequential scans."
    ],
    tags: ["Backend", "Database"]
  },
  {
    title: "Next.js App Router",
    date: "Sep 10, 2026",
    label: "Server Components",
    content: "Explored React Server Components (RSC) and parallel routes in Next.js 15. Server Actions significantly simplify form handling without external API endpoints.",
    tags: ["React", "Nextjs", "Fullstack"]
  }
];