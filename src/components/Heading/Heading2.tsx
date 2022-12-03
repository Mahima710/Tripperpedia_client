import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  count?: number;
  state?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  count = 0,
  state = "",
  className = "",
  heading = `Adevntures in ${state}`,
  subHeading,
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {count !== 0 ? count : "NO"} Activities Available
        </span>
      )}
    </div>
  );
};

export default Heading2;
