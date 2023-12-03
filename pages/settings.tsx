import React from "react";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { userIsLoggedIn } from "../firebase/auth/utils";

export default function Settings() {
  return (
      <></>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx);
  const authenticated = await userIsLoggedIn(cookies);

  if (!authenticated) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }

  return {
    props: {},
  };
}
