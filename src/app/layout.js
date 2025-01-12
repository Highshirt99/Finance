import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppProvider from "@/components/Provider ";

export const metadata = {
  title: "Personal Finance App",
  description: "A personal finance app built with Next.js.",
};

export default function RootLayout({ children }) {
 

  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
