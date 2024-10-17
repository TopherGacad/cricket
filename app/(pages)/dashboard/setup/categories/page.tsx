import { TbAlignBoxLeftStretch } from "react-icons/tb";
import Tabs from "../../components/tabs/tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticket categories"
}

export default function Categories() {
    return (
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Setup"/>
          
        </div>
        
        <div className="h-[95%]">
          CAEGORIES PAGE
        </div>
       
      </div>
    );
  }