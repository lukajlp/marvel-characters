import React, { FC } from "react";

interface CharacterCardProps {}

const CharacterCard: FC<CharacterCardProps> = ({}) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <figure>
        {/* <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="car!"
        /> */}
      </figure>
      <div className="card-body">
        <h2 className="card-title">Life hack</h2>
        <p>How to park your car at your garage?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn now!</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
