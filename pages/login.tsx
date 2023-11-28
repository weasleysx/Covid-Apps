import React from "react";
import Auth from "../components/auth";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { userIsLoggedIn } from "../firebase/auth/utils";
import LogoSvg from "../images/svg/logo.svg";

export default function Login() {
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center text-center overflow-hidden bg-cover bg-gradient-to-tr from-[#34577e] to-[#012d5e] py-6 sm:py-6">
        <div className="flex justify-center text-[#ffc107] no-underline hover:no-underline font-bold text-2xl lg:text-4xl pb-5">
          <div className="pl-2">COVID TimeLine Apps</div>
        </div>
        <Auth />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx);
  const authenticated = await userIsLoggedIn(cookies);

  if (authenticated) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  return {
    props: {},
  };
}
