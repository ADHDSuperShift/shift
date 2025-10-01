"use client";
import React from 'react';

interface DevelopmentNoticeProps {
  message: string;
  type?: 'warning' | 'info';
}

const DevelopmentNotice: React.FC<DevelopmentNoticeProps> = ({ 
  message, 
  type = 'warning' 
}) => {
  const bgColor = type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50';
  const borderColor = type === 'warning' ? 'border-yellow-200' : 'border-blue-200';
  const textColor = type === 'warning' ? 'text-yellow-700' : 'text-blue-700';

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4 mb-6`}>
      <div className="flex items-center">
        <div className="mr-3">
          {type === 'warning' ? (
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className={`${textColor} text-sm font-medium`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default DevelopmentNotice;
