import BasicLayout from "@/app/layouts/BasicLayout";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
      {/* eslint-disable-next-line react/jsx-no-undef */}
        <AntdRegistry>
          <BasicLayout>{children}</BasicLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
