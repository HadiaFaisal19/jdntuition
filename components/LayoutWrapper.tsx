"use client";

import { usePathname } from "next/navigation";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import AdminNavbar from "@/components/Admin/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route
  console.log("Current Pathname:", pathname); // Debugging: Check the pathname

  // Routes that should hide the header and footer
  const noHeaderFooterRoutes = ["/login", "/signup", "/book-now", "/admin/login", "/admin/signup", "/admin/dashboard"];

  // Check if the current route matches any excluded route
  const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);

  // Add authentication logic for admin (if required)
  const isAdminLoggedIn = false; // Replace with your actual authentication check

  return (
    <>
      {/* Conditionally render navbars */}
      {!hideHeaderFooter && (isAdminLoggedIn ? <AdminNavbar /> : <ResponsiveNav />)}

      {/* Render the page content */}
      {children}

      {/* Conditionally render the footer */}
      {!hideHeaderFooter && <Footer />}
      <ScrollToTop />
    </>
  );
}
