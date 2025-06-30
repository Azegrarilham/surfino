import "../globals.css";
import Navbar from "@/components/navbar/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="min-h-screen bg-muted">
         <Navbar />
          <div > {children} </div>
        </div>
  );
}
