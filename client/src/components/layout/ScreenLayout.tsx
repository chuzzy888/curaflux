import { ReactNode } from "react";

export const ScreenLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full max-w-[1540px] mx-auto px-4 sm:px-6">
      {children}
    </main>
  );
};
