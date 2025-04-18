import React, { useEffect, useState } from "react";
import TypewriterText from "./TypeWrite/TypewriterText";

interface LoadingProps {
  showLoading: boolean;
}

const Loading = ({ showLoading }: LoadingProps) => {
  const [visibleDivs, setVisibleDivs] = useState<number>(0);

  useEffect(() => {
    if (showLoading) {
      setVisibleDivs(0);
      const interval = setInterval(() => {
        setVisibleDivs((prev) => prev + 1);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showLoading]);

  return (
    <div className="load-container flex flex-col items-center justify-center h-full w-full">
      {visibleDivs >= 1 && (
        <div className="load flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-full bg-[#000B16]/70 p-2 w-[50%] fade-in">
          <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
          <h4>
            <TypewriterText text="Extracting Data.." />
          </h4>
        </div>
      )}

      {visibleDivs >= 2 && (
        <svg height="2" width="100" className="rotate-90 max-w-10 my-6">
        <line x1="0" y1="2" x2="100" y2="2" className="pulseforward" />
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          className="dashed-line-pulse"
        />
      </svg>
      )}

      {visibleDivs >= 3 && (
        <div className="load flex items-center justify-center border-1 mt-6.5 border-[#95DDFF] bg-[#000B16]/70 p-2 w-32 h-32 rotate-45 fade-in">
          <div className="flex items-center justify-center gap-2 -rotate-45">
            <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
            <h4>
              <TypewriterText text="Processing.." />
            </h4>
          </div>
        </div>
      )}

      {visibleDivs >= 4 && (
        <div className="load flex gap-20 mt-2 mb-9 fade-in">
          <svg height="2" width="100" className="-rotate-45">
            <line x1="0" y1="2" x2="100" y2="2" className="pulsebackward" />
            <line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              className="dashed-line-pulse-reverse "
            />
          </svg>
          <svg height="2" width="100" className="rotate-45">
            <line x1="0" y1="2" x2="100" y2="2" className="pulseforward" />
            <line x1="0" y1="1" x2="100" y2="1" className="dashed-line-pulse" />
          </svg>
        </div>
      )}

      {visibleDivs >= 4 && (
        <div className="load flex gap-30 fade-in">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-full bg-[#000B16]/70 p-2 px-6">
              <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
              <h4>Paper 1</h4>
            </div>
            {visibleDivs >= 5 && (
              <svg height="2" width="100" className="rotate-90 my-13">
                <line x1="0" y1="2" x2="100" y2="2" className="pulseforward" />
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  className="dashed-line-pulse"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-full bg-[#000B16]/70 p-2 px-6">
              <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
              <h4>Paper 2</h4>
            </div>
            {visibleDivs >= 5 && (
              <svg height="2" width="100" className="rotate-90 my-13">
                <line x1="0" y1="2" x2="100" y2="2" className="pulseforward" />
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  className="dashed-line-pulse"
                />
              </svg>
            )}
          </div>
        </div>
      )}

      {visibleDivs >= 6 && (
        <div className="load flex gap-28 justify-center items-center fade-in">
          <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-2xl bg-[#000B16]/70 p-2 px-6 w-[150px]">
            <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
            <TypewriterText text="Reviewing.." repeat={true} />
          </div>
          <div className="flex items-center justify-center gap-2 border-1 border-[#95DDFF] rounded-2xl bg-[#000B16]/70 p-2 px-6 w-[150px]">
            <img src="./images/dataExtract.png" alt="" className="h-8 w-8" />
            <h4>
              <TypewriterText text="Reviewing.." repeat={true} />
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
