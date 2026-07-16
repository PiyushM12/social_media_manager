import { useEffect, useState } from "react"
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon, Wand2Icon, XIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const notch = { clipPath: "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))" };

const navItems = [
  { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
  { name: "Accounts", icon: UsersIcon, path: "/accounts" },
  { name: "Schedular", icon: CalendarDaysIcon, path: "/schedule" },
  { name: "AI Composer", icon: Wand2Icon, path: "/ai-composer" },
];

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  const { logout, user } = useAuth()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("sidebar-collapsed") === "1"; } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem("sidebar-collapsed", collapsed ? "1" : "0"); } catch { /* ignore */ }
  }, [collapsed]);

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-ink-2 border-r border-white/8 flex flex-col h-full transform transition-[width,transform] duration-200 ease-in-out md:relative md:translate-x-0 ${collapsed ? "md:w-[76px]" : "md:w-64"} ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* desktop collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        aria-label="Toggle sidebar"
        className="hidden md:grid place-items-center absolute -right-3 top-16 size-6 bg-ink-2 border border-white/12 rounded-full text-white/60 hover:text-white hover:border-red/50 z-50 transition-colors"
      >
        {collapsed ? <ChevronRightIcon className="size-3.5" /> : <ChevronLeftIcon className="size-3.5" />}
      </button>

      {/* logo */}
      <div className={`p-4 pb-2 flex items-center justify-between ${collapsed ? "md:justify-center" : ""}`}>
        <div className="text-xl tracking-tight text-white flex items-center gap-2.5 font-serif">
          <span className="grid place-items-center size-8 bg-red text-white shadow-[0_0_16px_rgba(255,53,70,0.5)] shrink-0" style={notch}>
            <img src="/logo.svg" alt="logo" className="size-4 brightness-0 invert" />
          </span>
          <span className={collapsed ? "md:hidden" : ""}>SCHEDULER</span>
        </div>
        {/* mobile close */}
        <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="md:hidden p-1.5 text-white/50 hover:text-white">
          <XIcon className="size-5" />
        </button>
      </div>

      <div className={`px-6 py-2 ${collapsed ? "md:hidden" : ""}`}>
        <span className="hud-label text-white/30">Menu</span>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              title={collapsed ? item.name : undefined}
              className={`group relative flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 border ${collapsed ? "md:justify-center md:px-0" : ""} ${isActive ? "bg-red/12 text-white border-red/30" : "text-white/55 hover:bg-white/5 border-transparent hover:text-white"}`}
              style={notch}
            >
              <item.icon className={`size-4.5 shrink-0 ${isActive ? "text-red" : "text-white/50 group-hover:text-white/80"}`} />
              <span className={collapsed ? "md:hidden" : ""}>{item.name}</span>
              {isActive && <span className={`ml-auto w-[3px] h-5 bg-red shadow-[0_0_8px_rgba(255,53,70,0.8)] ${collapsed ? "md:hidden" : ""}`} />}
              {/* tooltip (collapsed desktop only) */}
              <span className={`pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink-2 border border-white/12 text-white text-xs px-2.5 py-1.5 z-50 hidden ${collapsed ? "md:group-hover:block" : ""}`} style={notch}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* footer */}
      <div className="p-3 border-t border-white/8">
        <div className={`flex items-center gap-3 p-2 rounded-lg ${collapsed ? "md:justify-center md:p-0 md:py-2" : ""}`}>
          <div className="size-8 bg-red/15 text-red border border-red/25 flex items-center justify-center text-sm font-medium shrink-0" style={notch}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className={`flex-1 min-w-0 ${collapsed ? "md:hidden" : ""}`}>
            <div className="text-sm text-white truncate">{user?.name}</div>
            <div className="text-xs text-white/40 truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={logout}
          title={collapsed ? "Sign Out" : undefined}
          className={`group relative mt-1 flex items-center gap-2 px-3 py-2 w-full text-sm text-white/55 hover:bg-red/10 hover:text-red transition-all duration-150 ${collapsed ? "md:justify-center md:px-0" : ""}`}
          style={notch}
        >
          <LogOutIcon className="size-4 shrink-0" />
          <span className={collapsed ? "md:hidden" : ""}>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
