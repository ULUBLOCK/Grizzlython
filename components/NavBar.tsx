import React from "react";
import AppBar from "@mui/material/AppBar";

import Link from "next/link";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import ThemeSwitcherComponent from "./ThemeSwitcher";
import Image from "next/image";


const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function PrimarySearchAppBar({ setTheme }: any) {
  return (
    <Box sx={{ flexGrow: 1 }} className="w-full">
      <AppBar
        position="static" color="transparent" className="w-ful justify-between" elevation={0}
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <Toolbar>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <SideBar />
            <Link href="/">
              <Image
              src="/logo.png" 
              width={100}
              height={100}
              alt="logo" 
              className="cursor-pointer"
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <div></div>
          </Box>
          <Box
            sx={{
              display: { md: "flex" },
              flexDirection: "row",
            }}
          >
            <div className="flex ml-4 items-center gap-2">
              <ThemeSwitcherComponent themeChanger={setTheme} />
              <WalletMultiButtonDynamic className="btn btn-outline glow my-4" />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}