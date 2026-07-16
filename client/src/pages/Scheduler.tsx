import { useEffect, useState } from "react";
import { PLATFORMS } from "../assets/assets";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Scheduler = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try{
      const {data} = await api.get("/api/posts")
      setPosts(data);
    }catch(error:any){
      toast.error(error?.response?.data?.message||error.message)
    }
  };
  useEffect(() => {
    (async () => await fetchPosts())();
    const interval = setInterval(async () => await fetchPosts(), 10000);
    return () => clearInterval(interval);
  }, []);

  const scheduled = posts.filter((p) => p.status === "scheduled");
  const published = posts.filter((p) => p.status === "published");

  const togglePlatform = (id: string) =>
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if(selectedPlatforms.length ===0){
      toast.error("Select atleast one platform");
      return;
    }
    if(!scheduleDate||!scheduleTime){
      toast.error("Select date and time");
      return;
    }
    if(selectedPlatforms.includes('instagram')&& !mediaFile){
      toast.error("Instgram requires an image or video");
      return;
    }
    const scheduledFor = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
    const formData = new FormData();
    formData.append("content",content);
    formData.append("scheduleFor",scheduledFor);
    formData.append("status","scheduled");
    formData.append("platforms",JSON.stringify(selectedPlatforms));
    if(mediaFile) formData.append("media",mediaFile);
    setLoading(true);
    try{
      await api.post("/api/posts",formData,{headers:{"Content-Type":"multipart/form-data"}})
      toast.success("Post Scheduled!");
      setContent("");
      setScheduleDate("");
      setScheduleTime("");
      setSelectedPlatforms([]);
      setMediaFile(null);
      fetchPosts();


    }catch(error:any){
      toast.error(error?.response?.data?.message||error.message);
    } finally{
      setLoading(false);
    }

  };

  const PostRow = ({ post, kind }: { post: any; kind: "scheduled" | "published" }) => (
    <div className="px-5 py-4 hover:bg-white/[0.03] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1.5 items-center">
          {post.platforms.map((pl: string) => {
            const meta = PLATFORMS.find((p) => p.id === pl);
            return meta ? <meta.icon key={pl} className="size-3.5 text-white/45" /> : null;
          })}
        </div>
        <div className="flex items-center gap-2">
          {post.mediaType && (
            <span className="text-xs bg-white/8 text-white/60 border border-white/10 px-1.5 py-0.5 rounded-md font-semibold capitalize">
              {post.mediaType}
            </span>
          )}
          <span className="text-xs text-white/35">
            {new Date(kind === "scheduled" ? post.scheduleFor : post.updatedAt).toLocaleString()}
          </span>
          {kind === "published" && <span className="text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full">Published</span>}
        </div>
      </div>
      <p className="text-sm text-white/55 line-clamp-2 max-w-md">{post.content}</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* compose panel */}
      <div className="w-full lg:w-[460px] shrink-0">
        <div className="panel rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg text-white font-medium">Compose Post</h2>
          </div>
          <form action="" className="space-y-5" onSubmit={handleSchedule}>
            {/* platforms */}
            <div>
              <label className="block text-xs text-white/45 uppercase tracking-wider mb-2">
                Platforms
              </label>
              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map((p) => {
                  const active = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      type="button"
                      key={p.id}
                      className={`flex items-center gap-1.5 p-3 rounded-xl border transition-all duration-150 ${active ? "bg-red/15 border-red/40 text-red scale-105" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"}`}
                      onClick={() => togglePlatform(p.id)}
                    >
                      <p.icon className="size-4.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* content */}
            <div>
              <label className="block text-xs text-white/45 uppercase tracking-wider mb-2">
                Content
              </label>
              <textarea
                required
                rows={5}
                placeholder="What do you want to share today?"
                className="field w-full px-5 py-4 rounded-2xl text-sm resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div
                className={`text-right text-xs mt-1 font-medium ${content.length > 280 ? "text-red" : "text-white/35"}`}
              >
                {content.length}/280
              </div>
            </div>
            {/* media upload */}
            <div>
              <label className="block text-xs text-white/45 uppercase tracking-wider mb-2">
                Media (optional){" "}
              </label>
              {mediaFile ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  {mediaFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(mediaFile)}
                      alt="preview"
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(mediaFile)}
                      className="w-full h-40 object-cover"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setMediaFile(null)}
                    className="absolute top-2 right-2 size-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-5 py-10 border-2 border-dashed border-white/12 rounded-xl cursor-pointer hover:border-red/50 hover:bg-red/5 transition-all group">
                  <span className="text-sm text-white/50 group-hover:text-red transition-colors">
                    Click to upload image or video
                  </span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && setMediaFile(e.target.files[0])
                    }
                  />
                </label>
              )}
            </div>
            {/* date and time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/45 uppercase tracking-wider mb-2">
                  Date
                </label>
                <div className="relative">
                  <CalendarIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                  <input
                    required
                    type="date"
                    className="field w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/45 uppercase tracking-wider mb-2">
                  Time
                </label>
                <div className="relative">
                  <ClockIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                  <input
                    required
                    type="time"
                    className="field w-full pl-10 pr-4 py-2.5 rounded-lg text-sm"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red hover:shadow-[0_8px_28px_rgba(244,63,94,0.4)] disabled:opacity-60 transition-all text-white rounded-xl font-medium"
            >
              {loading ? (
                <>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  Schedule Post
                  <ArrowRightIcon className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      {/* queue panel */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        {/* upcoming */}
        <div className="panel rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/8">
            <CalendarDaysIcon className="size-4 text-red" />
            <h3 className="text-white text-sm font-medium">Upcoming</h3>
            <span className="ml-auto text-xs font-bold bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
              {scheduled.length}
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-white/6">
            {scheduled.length == 0 ? (
              <div className="py-10 text-center text-white/35 text-sm">
                No posts scheduled yet
              </div>
            ) : (
              scheduled.map((post) => <PostRow key={post._id} post={post} kind="scheduled" />)
            )}
          </div>
        </div>
        {/* published */}
         <div className="panel rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/8">
            <SendIcon className="size-4 text-emerald-300" />
            <h3 className="text-white text-sm font-medium">Published</h3>
            <span className="ml-auto text-xs font-bold bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
              {published.length}
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-white/6">
            {published.length == 0 ? (
              <div className="py-10 text-center text-white/35 text-sm">
                No published posts yet
              </div>
            ) : (
              published.map((post) => <PostRow key={post._id} post={post} kind="published" />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
