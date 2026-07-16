import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import HudCard from "../components/motion/HudCard";

const clip = { clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" };

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login,user}= useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const {data} = await api.post(`/api/auth/${loginState?"login":"register"}`,
                {name,email,password}
            )
            login(data,data.token)
            navigate("/dashboard")
        }catch(error:any){
            toast.error(error.response?.data?.message || error?.message)
        } finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(user) navigate('/dashboard')
    },[user])

    return (
        <div className="min-h-screen bg-ink text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* grid + scanlines + red horizon line (no radial) */}
            <div className="absolute inset-0 grid-bg [mask-image:linear-gradient(180deg,rgba(0,0,0,0.6),transparent_75%)] pointer-events-none" />
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,53,70,0.5),transparent)] pointer-events-none" />

            <div className="relative w-full max-w-md">
                <HudCard hover={false} notch={22} innerClassName="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="flex items-center gap-2.5">
                            <span className="grid place-items-center size-8 bg-red text-white shadow-[0_0_18px_rgba(255,53,70,0.6)]" style={clip}>
                                <img src="/logo.svg" alt="Logo" className="size-5 brightness-0 invert" />
                            </span>
                            <h1 className="text-2xl font-serif tracking-tight">SCHEDULER</h1>
                        </Link>
                        <p className="hud-label text-white/40 mt-3">{loginState ? "Sign in to your console" : "Create your free account"}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        {!loginState && (
                            <div>
                                <label className="block mb-1.5 text-white/60">Name</label>
                                <div className="relative">
                                    <User2Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 z-10" />
                                    <input type="text" required placeholder="Enter your name" className="field w-full pl-10 pr-4 py-2.5" style={clip} value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block mb-1.5 text-white/60">Email</label>
                            <div className="relative">
                                <MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 z-10" />
                                <input type="email" required placeholder="you@company.com" className="field w-full pl-10 pr-4 py-2.5" style={clip} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1.5 text-white/60">Password</label>
                            <div className="relative">
                                <LockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 z-10" />
                                <input type="password" required placeholder="********" className="field w-full pl-10 pr-4 py-2.5" style={clip} value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-red text-white text-sm font-medium transition-all disabled:opacity-60 hover:shadow-[0_0_28px_rgba(255,53,70,0.55)] flex items-center justify-center gap-2" style={clip}>
                            {loading ? (
                                "Signing in..."
                            ) : (
                                <>
                                    {loginState ? "Sign In" : "Sign Up"} <ArrowRightIcon className="size-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white/45">
                        {loginState ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={() => setLoginState(false)} className="text-red hover:text-red/80 transition-colors">
                                    Create one free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setLoginState(true)} className="text-red hover:text-red/80 transition-colors">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </HudCard>
            </div>
        </div>
    );
}
