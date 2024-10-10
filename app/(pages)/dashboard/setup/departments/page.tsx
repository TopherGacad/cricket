import { Metadata } from "next";
import Tabs from "../../components/tabs/tabs";
import DepartmentAction from "./actions";
import DepartmentTable from "./table";

export const metadata: Metadata = {
  title: "Creating department"
}

export default function Departments() {
    return (
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Setup"/>
        </div>
        
        <div className="h-[95%] flex">
          <div className="flex flex-col justify-center items-center border-r-[1px] border-solid border-[#D9D9D9] h-full w-[30%]">
            <h1 className="text-center font-bold text-[45px] mb-10">
              <span className="text-[#61DADA] leading-tight">Add</span> New<br />Department
            </h1>

            <DepartmentAction />
          </div>
          
          <div className="w-[70%] h-full py-14 px-10 overflow-hidden">
            <DepartmentTable />
          </div>
        </div>
       
      </div>
    );
  }