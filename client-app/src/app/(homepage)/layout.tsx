"use client";
import HomepageFooter from "@/layout/homepage/HomepageFooter";
import HomepageHeader from "@/layout/homepage/HomepageHeader";
import React from "react";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <HomepageHeader >
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </HomepageHeader>
      <HomepageFooter />
    </div>
  );
}
