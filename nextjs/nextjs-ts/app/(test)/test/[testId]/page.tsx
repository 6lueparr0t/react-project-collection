"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: {
    newsId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pathname = usePathname();

  useEffect(() => {
  }, []);

  return <div>My Post: {params.newsId}</div>;
}
