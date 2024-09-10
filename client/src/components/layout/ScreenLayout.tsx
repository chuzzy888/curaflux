import React, { ReactNode } from "react";

export const ScreenLayout = ({ children }: { children: ReactNode }) => {
  return <main className="w-[1240px] mx-auto">{children}</main>;
};
