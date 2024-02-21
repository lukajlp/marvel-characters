import React, { FC } from "react";

interface LoadingbarsProps {
  className?: string;
}

const Loadingbars: FC<LoadingbarsProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="loading loading-bars loading-md"></span>
    </div>
  );
};

export default Loadingbars;
