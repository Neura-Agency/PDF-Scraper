'use client';
import React, { useEffect, useState } from 'react';
import './Preview.css';
import Loading from './Loading';

interface PreviewProps {
  responseData: string;
  loading: boolean;
}

const Preview = ({ responseData, loading }: PreviewProps) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (responseData.includes('Kickoff completed') || 
        responseData.includes('127.0.0.1:58725 - "GET /myagent HTTP/1.1" 200 OK')) {
      setShowLoading(false);
    }
  }, [responseData]);

  return (
    <div className="min-h-screen p-12 h-full w-[60%]">
      <div className="bg-[#000B16]/70 border-1 border-[#27d2f070] rounded-4xl bg-opacity-48 h-full p-4 overflow-hidden">
        {showLoading && loading && <Loading />}
        {!loading && (
          <div
            className="h-full w-full overflow-auto custom-scrollbar p-2"
            dangerouslySetInnerHTML={{ __html: responseData }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Preview;