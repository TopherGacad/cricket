import { Metadata } from "next";
import Tabs from "../../components/tabs/tabs";
import DepartmentAction from "./actions";

export const metadata: Metadata = {
  title: "Creating department"
}

export default function Departments() {
    return (
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Setup"/>
          
        </div>
        
        <div className="border-[1px] border-solid border-red-600 h-[95%]">
          <DepartmentAction />
        </div>
       
      </div>
    );
  }