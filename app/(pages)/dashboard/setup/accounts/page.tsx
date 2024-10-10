import { Metadata } from "next";
import Tabs from "../../components/tabs/tabs";
import AccountsAction from "./actions";

export const metadata: Metadata = {
  title: "Creating new User Accounts"
}

export default function accounts() {
    return (
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Setup"/>
          
        </div>
        
        <div className="bg-white h-[95%] flex flex-col">
          <AccountsAction />
        </div>
      </div>
      
    );
  }