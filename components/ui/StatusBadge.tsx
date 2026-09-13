"use client";

interface StatusBadgeProps {
  status?: string;
  variant?: "available" | "active" | "neutral";
  className?: string;
}

export default function StatusBadge({
  status = "AVAILABLE FOR OPPORTUNITIES",
  variant = "available",
  className = "",
}: StatusBadgeProps) {
  const isAvailable = variant === "available";

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-neutral-900/60 backdrop-blur-md text-[10px] font-mono tracking-wider text-neutral-300 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isAvailable && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isAvailable ? "bg-emerald-500" : variant === "active" ? "bg-blue-400" : "bg-neutral-500"
          }`}
        />
      </span>
      <span className="uppercase">{status}</span>
    </div>
  );
}
