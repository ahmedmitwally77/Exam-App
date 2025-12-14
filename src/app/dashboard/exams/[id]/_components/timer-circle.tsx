interface TimerCircleProps {
  duration: number;
  timeLeft: number;
}

export default function TimerCircle({ duration, timeLeft }: TimerCircleProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#1B6BFC"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${
              2 * Math.PI * 36 * (timeLeft / (duration * 60))
            }`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
}
