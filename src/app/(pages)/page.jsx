
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import { getSortedPostsData } from "@library/posts";

import AppData from "@data/app.json";

import SlidersClient from "@components/client/SlidersClient";

export const metadata = {
  title: {
		default: "Home",
	},
  description: AppData.settings.siteDescription,
}

async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <SlidersClient />
    </>
  );
};
export default Home;

async function getAllPosts() {
  const allPosts = getSortedPostsData();
  return allPosts;
}