// /app/login/loading.tsx
// export default function Loading() {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center">
//         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="relative w-24 h-24">
        {/* Top-left ticket */}
        <div className="absolute w-12 h-12 bg-blue-500 rounded shadow-md animate-move-top-left"></div>

        {/* Top-right ticket */}
        <div className="absolute w-12 h-12 bg-red-500 rounded shadow-md animate-move-top-right"></div>

        {/* Bottom-left ticket */}
        <div className="absolute w-12 h-12 bg-green-500 rounded shadow-md animate-move-bottom-left"></div>

        {/* Bottom-right ticket */}
        <div className="absolute w-12 h-12 bg-yellow-500 rounded shadow-md animate-move-bottom-right"></div>
      </div>
    </div>
  );
};

export default Loading;
