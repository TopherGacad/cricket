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

        <DepartmentAction />
      </div>
    );
  }