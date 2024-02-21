import React, { FC } from "react";

const Navbar: FC = () => {
  return (
    <header>
      <div className="navbar bg-base-100 container">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
