import Navigation from "@/_components/Navigation";
import "./globals.css";
import { FormProvider } from "@/_context/provider";
import { Toaster } from "react-hot-toast";



export default function RootLayout({ children }) {
  
  return (
    <html
      lang="en"
    >
      <body className="bg-nav">
    
    <FormProvider>
    <Navigation />
     <Toaster />

        {children}
        
     </FormProvider>     
        </body>
    </html>
  );
}
