import React from "react";
import { signOut } from "../../../utils/genericUtils";
import Svg from "../../svg/";


const Footer = () => {
  return (
    <footer className="flex justify-between">
    <div className="items-end">
     
    </div>
  
    <div className="items-end">
    <a
        href=""
        className="flex ml-1 items-center mt-3 px-1 pb-5 mr-5 no-underline text-blue-50 opacity-70 hover:opacity-100"
        onClick={signOut}
      >
        <Svg.SignOutSvg />
        {<div className="pl-2">Sign Out</div>}
      </a>
    </div>
  </footer>
  
  );
};

export default Footer;