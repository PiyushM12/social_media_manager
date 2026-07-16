import { CheckCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface PlatformPickerModalProps{
    connectedIds:string[];
    connecting:string|null;
    onClose:()=>void;
    onConnect:(platformId:string)=>void;
}

const PlatformPickerModal = ({connectedIds,connecting,onClose,onConnect}:PlatformPickerModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
        <div className="glass-strong rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                <h3 className="text-white font-medium">Choose a platform</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                    <XIcon className="size-4"/>
                </button>
            </div>
            {/* platfrom list */}
            <div className="p-6 flex flex-col gap-2">
            {PLATFORMS.map((p)=>{
                const isConnected = connectedIds.includes(p.id);
                const isConnecting= connecting===p.id;
                return(
                    <button key={p.id}
                    disabled={isConnected|| isConnecting}
                    onClick={()=>onConnect(p.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${isConnected?"border-red/30 bg-red/10 cursor-default":"border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06] cursor-pointer"} ${isConnecting && "opacity-60"} `} >
                        <div className="p-2">
                            <p.icon className={`size-5 ${isConnected?"text-red":"text-white/70"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`text-sm ${isConnected?"text-red":"text-white"}`} >{p.name}</div>
                            <div className="text-xs text-white/40 truncate">
                                {isConnected?"Already Connected":p.description}
                            </div>
                        </div>
                        {isConnected&& <CheckCircleIcon className="size-4 text-red shrink-0"/>}
                        {isConnecting && <div className="size-4 border-2 border-red border-t-transparent rounded-full animate-spin shrink-0" />}
                        {!isConnected && !isConnecting &&<ExternalLinkIcon className="size-3.5 text-white/30 shrink-0"/>}
                    </button>
                )
            })}
            </div>
        </div>
    </div>
  )
}

export default PlatformPickerModal
