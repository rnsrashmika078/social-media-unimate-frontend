import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Theme from "@/components/custom/theme";
import { ReduxProvider } from "@/components/providers/reduxProvider";
import QueryProvider from "./providers/queryClientProvider";
import { AppProviders } from "./providers/AppProvider";
import ToastProviderContainer from "@/components/custom/toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Unimate",
  description: "Social Media for Uni student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} antialiased`}>
      <body
        className={` antialiased transition-all`}
        // style={{ fontFamily: "var(--font-rubik)" }}
      >
        <QueryProvider>
          <ReduxProvider>
            <AppProviders>
              <Theme />
              <ToastProviderContainer />
              <div className="flex min-w-screen h-screen ">{children}</div>
            </AppProviders>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
