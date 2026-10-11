import React from 'react';

interface ContactRobotCanvasProps {
  isFormFocused: boolean;
}

export const ContactRobotCanvas: React.FC<ContactRobotCanvasProps> = ({ isFormFocused }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Ambient background glow and optical concentric rings */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[650px] h-[650px] flex items-center justify-center opacity-30 transition-all duration-700">
        {/* Outer Ring */}
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-700 ${
            isFormFocused
              ? 'border-neutral-500 scale-105 opacity-60'
              : 'border-neutral-800 scale-100 opacity-25'
          }`}
        />

        {/* Middle Dashed Ring */}
        <div
          className={`absolute inset-16 rounded-full border border-dashed transition-all duration-700 ${
            isFormFocused
              ? 'border-white/50 rotate-45 scale-105 opacity-70'
              : 'border-neutral-700 rotate-0 scale-100 opacity-20'
          }`}
        />

        {/* Inner Solid Titanium Ring */}
        <div
          className={`absolute inset-32 rounded-full border transition-all duration-700 ${
            isFormFocused
              ? 'border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.2)] opacity-80'
              : 'border-neutral-800 opacity-20'
          }`}
        />

        {/* Center Optical Sensor Pupil */}
        <div
          className={`w-28 h-28 rounded-full border transition-all duration-500 flex items-center justify-center ${
            isFormFocused
              ? 'border-white bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.4)] scale-110'
              : 'border-neutral-700 bg-black/60 scale-95'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full transition-all duration-500 ${
              isFormFocused
                ? 'bg-white shadow-[0_0_20px_#fff] scale-100'
                : 'bg-neutral-600 scale-75'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
