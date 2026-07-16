import { ActivityIcon, CheckCircleIcon, ClockIcon, PlusIcon, SendIcon, Share2Icon, TrendingUpIcon, Wand2Icon, CalendarDaysIcon, ArrowRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import HudCard from "../components/motion/HudCard"

const notchBtn = { clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" };

const quickActions = [
  { label: "Compose a post", desc: "Schedule across platforms", icon: CalendarDaysIcon, to: "/schedule" },
  { label: "Generate with AI", desc: "Captions & images", icon: Wand2Icon, to: "/ai-composer" },
  { label: "Connect an account", desc: "Link a new platform", icon: Share2Icon, to: "/accounts" },
];

const Dashboard = () => {
  const [stats, setStats] = useState({ scheduled: 0, published: 0, connectedAccounts: 0 })
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postRes, accountRes, activityRes] = await Promise.all([api.get("/api/posts"), api.get("/api/accounts"), api.get("/api/activity")])
        const posts = postRes.data;
        setStats({
          scheduled: posts.filter((p: any) => p.status == 'scheduled').length,
          published: posts.filter((p: any) => p.status === 'published').length,
          connectedAccounts: accountRes.data.filter((a: any) => a.status === 'connected').length,
        })
        setActivities(activityRes.data)
      }
      catch (error: any) {
        console.error("Error fetching dashboard data", error)
      }
    }
    fetchDashboardData();
  }, [])

  const statCards = [
    { label: "Scheduled Posts", value: stats.scheduled, icon: ClockIcon, trend: "+2 today", code: "01" },
    { label: "Published Posts", value: stats.published, icon: CheckCircleIcon, trend: "All Time", code: "02" },
    { label: "Connected Accounts", value: stats.connectedAccounts, icon: Share2Icon, trend: "Active", code: "03" },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white uppercase">Good Morning</h2>
          <p className="text-white/45 mt-1 text-sm sm:text-base">Here's what's happening with your social accounts today.</p>
        </div>
        <Link to="/schedule" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red text-white text-sm font-medium hover:shadow-[0_0_24px_rgba(255,53,70,0.5)] transition-all shrink-0" style={notchBtn}>
          <PlusIcon className="size-4" /> New Post
        </Link>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {statCards.map((card) => (
          <HudCard key={card.label} notch={16} innerClassName="p-5">
            <div className="flex items-start justify-between mb-4">
              <span className="grid place-items-center size-11 bg-red/12 text-red border border-red/25">
                <card.icon className="size-5" />
              </span>
              <div className="hud-label text-red flex items-center gap-1">
                <TrendingUpIcon className="size-3" />
                {card.trend}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-serif text-white tabular-nums">{card.value}</div>
                <p className="text-sm text-white/45 mt-1">{card.label}</p>
              </div>
              <span className="hud-label text-white/20 text-lg">{card.code}</span>
            </div>
          </HudCard>
        ))}
      </div>

      {/* main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* activity */}
        <div className="lg:col-span-2 panel flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
            <h2 className="hud-tick pl-4 text-white font-serif uppercase text-sm tracking-wide">Recent Activity</h2>
            <span className="hud-label text-white/35">{activities.length} events</span>
          </div>
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center flex-1">
              <div className="size-12 bg-white/5 border border-white/8 flex items-center justify-center mb-3">
                <ActivityIcon className="size-6 text-white/40" />
              </div>
              <p className="text-white/70">No activity yet</p>
              <p className="text-white/40 text-sm mt-1 max-w-xs">Connect accounts and schedule posts to see events appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/6">
              {activities.map((activity) => (
                <div key={activity._id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/3 transition-colors">
                  <div className="size-9 flex items-center justify-center shrink-0 mt-0.5 bg-red/12 text-red border border-red/20">
                    <SendIcon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="hud-label px-2 py-0.5 bg-red/12 text-red">Published</span>
                      <span className="hud-label text-white/35 shrink-0">{new Date(activity.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-white/60">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* quick actions */}
        <div className="panel h-fit">
          <div className="px-6 py-4 border-b border-white/8">
            <h2 className="hud-tick pl-4 text-white font-serif uppercase text-sm tracking-wide">Quick Actions</h2>
          </div>
          <div className="p-3 flex flex-col gap-1">
            {quickActions.map((a) => (
              <Link key={a.to} to={a.to} className="group flex items-center gap-3 p-3 border border-transparent hover:border-red/25 hover:bg-red/8 transition-all" style={notchBtn}>
                <span className="grid place-items-center size-9 bg-white/5 border border-white/10 text-red shrink-0 group-hover:border-red/40 transition-colors">
                  <a.icon className="size-4.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white">{a.label}</div>
                  <div className="text-xs text-white/40">{a.desc}</div>
                </div>
                <ArrowRightIcon className="size-4 text-white/25 group-hover:text-red group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
