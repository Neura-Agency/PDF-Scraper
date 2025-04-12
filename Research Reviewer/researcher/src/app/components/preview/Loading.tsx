import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-full bg-[#000B16]/70 p-2 w-[50%]">
        <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
        <h4>Extrating Data..</h4>
      </div>
      <span className="min-h-10 w-0.5 bg-[#95DDFF] animate-pulse rounded-full"></span>
      <div className=" flex items-center justify-center border-1 mt-6.5 border-[#95DDFF] bg-[#000B16]/70 p-2 w-32 h-32 rotate-45">
        <div className="flex items-center justify-center gap-2 -rotate-45">
          <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
          <h4>Processing..</h4>
        </div>
      </div>
      <div className="flex gap-40 -mt-10">
        <span className="min-h-20 w-0.5 bg-[#95DDFF] animate-pulse rounded-full rotate-45"></span>
        <span className="min-h-20 w-0.5 bg-[#95DDFF] animate-pulse rounded-full -rotate-45"></span>
      </div>
      <div className="flex gap-30 -mt-3">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-full bg-[#000B16]/70 p-2 px-6 w-[50%">
            <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
            <h4>Paper 1</h4>
          </div>
          <span className="min-h-20 w-0.5 bg-[#95DDFF] animate-pulse rounded-full"></span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-full bg-[#000B16]/70 p-2 px-6 w-[50%">
            <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
            <h4>Paper 1</h4>
          </div>
          <span className="min-h-20 w-0.5 bg-[#95DDFF] animate-pulse rounded-full"></span>
        </div>
      </div>
      <div className="flex gap-24 justify-center items-center">
        <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-2xl bg-[#000B16]/70 p-2 px-6 w-[50%">
          <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
          <h4>Reviewing..</h4>
        </div>
        <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-2xl bg-[#000B16]/70 p-2 px-6 w-[50%">
          <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
          <h4>Reviewing..</h4>
        </div>
      </div>
    </div>
  );
};

export default Loading;
