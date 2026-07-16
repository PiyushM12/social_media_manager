import {
  AlertCircleIcon,
  CheckCircleIcon,
  PlusIcon,
  UnplugIcon,
} from "lucide-react";
import { PLATFORMS } from "../assets/assets";

interface AccountListProps {
  accounts: any[];
  onDisconnect: (accountId: string) => Promise<void>;
}

const AccountList = ({ accounts, onDisconnect }: AccountListProps) => {
  const handleDisconnect = async (accountId: string) => {
    const confirm = window.confirm(
      "Are you sure yu want to disconnect this account?",
    );
    if (!confirm) return;
    await onDisconnect(accountId);
  };
  if (accounts.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center py-20 px-6">
        <div className="size-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/8">
          <PlusIcon className="size-6 text-white/50" />
        </div>

        <p className="text-white text-lg">No Accounts Connected</p>

        <p className="text-sm text-white/40 mt-1 max-w-xs text-center">
          Connect your first social platform to start scheduling and automating
          your content.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {accounts.map((account, index) => {
        const meta = PLATFORMS.find((p) => p.id === account.platform);
        if (!meta) return null;
        return (
          <div
            key={index}
            className="group panel rounded-2xl p-5 flex items-center gap-4 hover:border-white/15 transition-all"
          >
            <div className="size-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-white/8">
              <meta.icon className="size-6 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white truncate">{account.handle}</div>
              <div className="text-sm text-white/45 mt-0.5">{meta.name}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {account.status === "connected" ? (
                  <>
                    <CheckCircleIcon className="size-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Connected</span>
                  </>
                ) : (
                  <>
                    <AlertCircleIcon className="size-4 text-amber-400" />
                    <span className="text-xs text-amber-400">Disconnected</span>
                  </>
                )}
              </div>
              <button
                onClick={() => handleDisconnect(account._id)}
                title="Disconnect account"
                className="ml-2 p-1.5 rounded-lg text-white/25 group-hover:text-red transition-all"
              >
                <UnplugIcon className="size-4" />
              </button>
            </div>

        );
      })}
    </div>
  );
};

export default AccountList;
