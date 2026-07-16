import { useState } from "react"
import Sidebar from "./Sidebar"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const pageTitles: Record<string,string>={
  "/dashboard":"Dashboard",
  "/accounts":"Social Accounts",
  "/schedule":"Post Scheduler",
  "/ai-composer":"AI Composer",
}

const Layout = () => {

  const {isAuthenticated,isLoading} = useAuth()
    const location = useLocation()
  const title= pageTitles[location.pathname]||"SocialAI";
  const  [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
   if(isLoading){
    return(
      <div className="flex h-screen items-center justify-center app-dark">
        <div className="size-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
   }
   if(!isAuthenticated){
    return <Navigate to="/login" replace/>
   }
  return (
    <div className="flex h-screen app-dark overflow-hidden">
      {/* subtle grid backdrop */}
      <div className="fixed inset-0 -z-10 grid-bg [mask-image:linear-gradient(180deg,rgba(0,0,0,0.6),transparent_80%)] pointer-events-none" />
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={()=>setIsMobileMenuOpen(false)} />}
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/8 flex items-center px-4 md:px-8 gap-4 shrink-0 bg-white/[0.02]">
          <button className="md:hidden p-2 -ml-2 text-white/60 hover:text-white transition-colors" onClick={()=>{setIsMobileMenuOpen(true)}}>
            <MenuIcon className="size-6"/>
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block w-1 h-8 bg-red shadow-[0_0_12px_rgba(255,53,70,0.7)]" />
            <div>
              <h1 className="text-white font-serif text-lg uppercase tracking-tight">{title}</h1>
              <p className="hud-label text-white/35 hidden sm:block">Manage & automate your social presence</p>
            </div>
          </div>
        </header>
        <main className="relative flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-10">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default Layout
