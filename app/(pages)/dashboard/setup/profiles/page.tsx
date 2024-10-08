import { Metadata } from "next";
import Tabs from "../../components/tabs/tabs";

export const metadata: Metadata = {
  title: "Your User Profile"
}

export default function profiles() {
    return (
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Setup"/>
          
        </div>
        
        <div className="border-[1px] border-solid border-red-600 h-[95%]">
          Profiles
        </div>
       
      </div>
    );
  }