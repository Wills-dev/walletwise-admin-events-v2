import React from "react";

const MainLoader = () => {
  return (
    <div className="min-h-screen h-full w-full flex flex-col justify-center items-center dark:bg-gray-900 bg-white px-4">
      <h6 className="text-2xl text-center text-purple-800 dark:text-purple-600">
        Event Admin
      </h6>
      <div className="mt-8 w-64 h-1 bg-purple-100 dark:bg-purple-500 rounded-full overflow-hidden mx-auto">
        <div className="h-full bg-linear-to-r from-purple-500 dark:from-purple-300 to-indigo-500 dark:to-indigo-300 rounded-full animate-progress"></div>
      </div>
      <style>{`
        @keyframes draw {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 1.5s ease-out infinite;
        }
        
        .animate-draw-delayed {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 1.5s ease-out 0.3s infinite;
        }
        
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MainLoader;
