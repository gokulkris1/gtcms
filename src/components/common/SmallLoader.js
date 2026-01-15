import React from "react";
import "./SmallLoader.css";

const SmallLoader = () => {
  return (
    <div>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default SmallLoader;
