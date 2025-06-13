import React, { PropsWithChildren } from "react";
import { SidebarProvider } from "../ui/sidebar";

const CustomProviders = ({ children }: PropsWithChildren) => {
  return <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>;
};

export default CustomProviders;
