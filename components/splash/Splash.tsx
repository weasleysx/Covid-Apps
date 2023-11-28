import React from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "../../images/hero.png";

export default function Splash() {
  return (
    <>
      <div className="h-screen pb-14 bg-right bg-cover flex flex-col">
        <div className="w-full container mx-auto p-6">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center text-[#ffc107] no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              <div className="pl-2">COVID TimeLine Apps</div>
            </div>

            <div className="flex w-1/2 justify-end content-center">
              <Link href="/login">
                <a>
                  <button className="bg-[#ffc107] hover:bg-white hover:text-[#ffc107]  text-white font-bold py-2 px-4 rounded-full">
                    Sign in
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="container pt-24 md:pt-12 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-xl md:text-7xl text-indigo-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
              Main Hero message to sell your app
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
              Sub-hero message, not too long and not too short. Make it just
              right!
            </p>
          </div>

          <div className="w-full xl:w-3/5 py-6 xl:pl-48 overflow-y-hidden">
            <Image src={hero} />
          </div>
          <footer>
            <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
              &copy; My App 2022
            </div>
          </footer>
        </div> */}
      </div>
    </>
  );
}
