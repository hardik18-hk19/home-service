import React from "react";
import CategorySideBar from "./search/_components/CategorySideBar";

function layout({ children }) {
  return (
    <div>
      <div className="grid grid-cols-4 mt-8">
        <div className="hidden md:block">
        <CategorySideBar/>
          {/* Side Category NAv BAr */}
        </div>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
}

export default layout;
