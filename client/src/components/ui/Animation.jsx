import { Heart, Shield, Pill, Cross } from "lucide-react";

const Animation = () => {
  return (
    <>
      <div className="absolute inset-0"></div>

      {/* Floating medical icons */}
      <div className="absolute inset-0">
        {/* Large background shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-teal-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-emerald-300/25 rounded-full blur-lg animate-pulse delay-700"></div>

        {/* Floating medical icons */}
        <div className="absolute top-32 left-1/4 text-emerald-300/30 animate-bounce delay-300">
          <Pill size={24} />
        </div>
        <div className="absolute top-56 right-1/3 text-teal-300/25 animate-bounce delay-700">
          <Cross size={20} />
        </div>
        <div className="absolute bottom-48 left-1/3 text-cyan-300/30 animate-bounce delay-500">
          <Shield size={22} />
        </div>
        <div className="absolute bottom-32 right-1/4 text-emerald-400/25 animate-bounce delay-900">
          <Shield size={18} />
        </div>
        <div className="absolute top-1/2 left-12 text-teal-200/30 animate-bounce delay-200">
          <Cross size={16} />
        </div>
        <div className="absolute top-2/3 right-16 text-cyan-300/20 animate-bounce delay-600">
          <Heart size={14} />
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-16 right-1/2 w-2 h-2 bg-emerald-400/40 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-teal-400/30 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-3/4 left-16 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-ping delay-700"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Animation;
