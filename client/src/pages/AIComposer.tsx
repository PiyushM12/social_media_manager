import { useEffect, useState } from "react";
import { PLATFORMS } from "../assets/assets";
import {
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  HistoryIcon,
  Loader2Icon,
  TimerIcon,
  Wand2Icon,
  XIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";


const AIComposer = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([]);

  const [activeSchedular, setActiveSchedular] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const FetchGenerations = async () => {
    try{
      const {data} = await api.get("api/posts/generations")
      setGenerations(data)
    } catch(error:any){
      toast.error(error?.response?.data?.message || error?.message)
    }
  };
  useEffect(() => {
    FetchGenerations();
  }, []);
  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];
  const handleGenerate = async () => {
    if(!prompt){
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true);
    try {
        const {data} = await api.post("/api/posts/generate",{prompt,tone,generateImage});
        setGenerations([data,...generations]);
        setActiveSchedular(data)
        toast.success("Content generated!")
    } catch (error:any) {
      toast.error(error?.response?.data?.message||error?.message);
    } finally{
      setLoading(false);
    }

  }
  const handleSchedule = async () => {
    if(!activeSchedular) return;
    if(selectedPlatforms.length ===0){
      toast.error("Select atleast one platform");
      return;
    }
    if(!scheduledDate||!scheduledTime){
      toast.error("Select date and time");
      return;
    }
    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    setScheduling(true);
    try{
      await api.post("/api/posts",{
        content:activeSchedular.content,
        mediaUrl :activeSchedular.mediaUrl,
        mediaType :activeSchedular.mediaType,
        plaforms : selectedPlatforms,
        scheduledFor,
        status:"scheduled",
      })
      toast.success("AI Post Scheduled!");
      setActiveSchedular(null)
      setScheduledDate("");
      setScheduledTime("");
      setSelectedPlatforms([]);



    }catch(error:any){
      toast.error(error?.response?.data?.message||"Failed to schedule");
    } finally{
      setScheduling(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-6 text-center mt-10 sm:mt-16">
        <div className="inline-flex items-center gap-1.5 glass text-white/70 text-[11px] font-medium tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-full">
          <Wand2Icon className="size-3 text-red" />
          AI Composer
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-tight">
          What should we <span className="italic text-red-grad">create</span> today?
        </h1>
        <div className="relative group mt-10">
          <textarea
            className="field w-full px-6 py-6 rounded-2xl text-sm resize-none h-40"
            placeholder="Share your idea...(e.g. A post about the launch of our new eco-friendly coffee beans) "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-4 right-3 flex items-center gap-3 text-sm">
            <button
              onClick={() => setGenerateImage(!generateImage)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 text-white/70 py-2 px-3 rounded-lg"
            >
              <span>AI Image</span>
              <div
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${generateImage ? "bg-red" : "bg-white/15"}`}
              >
                <span
                  className={`pointer-events-none size-4 transform translate-y-0.5 rounded-full bg-white transition ${generateImage ? "translate-x-4.5" : "translate-x-0.5"}`}
                />
              </div>
            </button>
            <button
              disabled={loading}
              onClick={handleGenerate}
              className="bg-red hover:shadow-[0_8px_24px_rgba(244,63,94,0.4)] disabled:opacity-60 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
            >
              {loading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  Generate
                  <ArrowRightIcon className="size-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all border ${tone == t ? "bg-red border-red text-white" : "bg-white/[0.03] border-white/10 text-white/55 hover:border-white/20 hover:text-white/80"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ai generated post */}
      <div className="space-y-6 pt-12 border-t border-white/8">
        <div className="flex items-center justify-between text-white/70">
          <div className="flex items-center gap-2">
            <HistoryIcon className="size-5" />
            <h2 className="text-xl font-medium text-white">Recent Generations</h2>
          </div>
          <span className="text-sm text-white/45 bg-white/5 px-2.5 py-0.5 rounded-full">
            {generations.length} total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {generations.map((gen) => (
            <div
              key={gen._id}
              className="group panel rounded-2xl p-5 hover:border-white/15 transition-all relative overflow-hidden card-lift"
            >
              <div className="flex flex-col h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40 uppercase tracking-widest">
                    {new Date(gen.createdAt).toLocaleString()}
                  </span>
                  <span className="text-xs text-red bg-red/15 px-2 py-0.5 rounded-md">
                    {gen.tone}
                  </span>
                </div>
                <p className="text-sm text-white/65 line-clamp-3 leading-relaxed flex-1">
                  {gen.content}
                </p>

                {gen.mediaUrl && (
                  <div className="rounded-xl overflow-hidden border border-white/8 bg-white/5">
                    <img
                      src={gen.mediaUrl}
                      alt="Gen"
                      className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveSchedular(gen)}
                    className="flex-1 bg-white/8 hover:bg-red hover:text-white text-white/70 text-xs py-2.5 rounded-lg transition-all"
                  >
                    Schedule Post
                  </button>
                </div>
              </div>
            </div>
          ))}

          {generations.length == 0 && (
            <div className="col-span-full py-20 text-center space-y-2">
              <div className="size-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-white/30">
                <Wand2Icon className="size-6" />
              </div>
              <p className="text-white/40 text-sm">
                No content generated yet. Try generating some content using the
                AI.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* schedule post */}
      {activeSchedular && (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="glass-strong rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-8 py-4 border-b border-white/8">
              <h3 className="text-white font-medium">Schedule Generation</h3>
              <button
                onClick={() => setActiveSchedular(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/8">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Prompt</p>
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {activeSchedular.prompt}
                </p>
              </div>
              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/8 space-y-4">
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {activeSchedular.content}
                </p>
                {activeSchedular.mediaUrl && <img src={activeSchedular.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-white/10" />}
              </div>
            </div>
            <div className="p-8 border-t border-white/8 space-y-8">
             <div className="space-y-6">
              <div>
                <label className="block text-xs text-white/55 uppercase tracking-widest mb-4"> Select Channels</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((p)=>{
                    const active= selectedPlatforms.includes(p.id);
                    return(
                      <button key={p.id} onClick={()=>{
                        setSelectedPlatforms((prev)=>(prev.includes(p.id)?prev.filter((x)=>x!==p.id):[...prev,p.id]))
                      } }className={`p-2.5 rounded-lg border text-xs ${active?"bg-red border-red text-white":"bg-white/[0.03] border-white/10 text-white/50 hover:border-white/20"}`} >
                        <p.icon className="size-4.5" />
                      </button>
                    )
                  })}
                </div>
              </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
                    <div className="relative">
                      <CalendarIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10" />
                      <input type="date" className="field w-full pl-11 pr-4 py-3 rounded-lg text-sm" value={scheduledDate} onChange={(e)=>setScheduledDate(e.target.value)} />
                    </div>
                    <div className="relative">
                      <ClockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10" />
                      <input type="time" className="field w-full pl-11 pr-4 py-3 rounded-lg text-sm" value={scheduledTime} onChange={(e)=>setScheduledTime(e.target.value)} />
                    </div>
                  </div>
             </div>
                  <button onClick={handleSchedule} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red text-white font-medium hover:shadow-[0_8px_24px_rgba(244,63,94,0.4)] transition">
                    {scheduling?<Loader2Icon className="size-4 animate-spin" />:<TimerIcon className="size-4" />}
                    Set Schedule
                  </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIComposer;
