import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Accounts from "./pages/Accounts";
import Scheduler from "./pages/Scheduler";
import AIComposer from "./pages/AIComposer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0e0d15",
          color: "#f3f2f6",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#ff3546", secondary: "#0e0d15" } },
        error: { iconTheme: { primary: "#ff3546", secondary: "#0e0d15" } },
        loading: { iconTheme: { primary: "#ff3546", secondary: "#0e0d15" } },
      }}
    />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/schedule" element={<Scheduler />} />
          <Route path="/ai-composer" element={<AIComposer />} />
        </Route>
      </Routes>
    </>
  );
}
