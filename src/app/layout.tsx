import "./globals.css";
import Chatbot from "@/components/Chatbot";

export const metadata = {
  title: "Netreshwori Engineering Consultancy Pvt. Ltd.",
  description: "Planning, project management and operations for infrastructure across Nepal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
