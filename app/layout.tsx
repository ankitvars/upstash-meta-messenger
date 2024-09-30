import Head from "./head";
import "@/styles/globals.css";
import Header from "./Header";

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <Head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
