import { Metadata } from "next";
import Tabs from "../../components/tabs/tabs";
import AccountsAction from "./actions";

export const metadata: Metadata = {
  title: "Creating new User Accounts",
};

export default function accounts() {
  return (
    <div className="bg-white w-full h-full">
      <div className="h-[5%]">
        <Tabs variant="Setup" />
      </div>

      <div className="h-[95%] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center w-[70%] h-full">
          <h1 className="font-bold text-[60px] mb-10">
            <span className="text-[#61DADA]">Create</span> New Account
          </h1>

          <div className="flex flex-col items-center justify-center h-[60%] w-[70%] px-24 border-[1px] border-solid border-[#C7C7C7] rounded-[5px]">
              <AccountsAction />
          </div>
        </div>
      </div>
    </div>
  );
}
