export const metadata: Metadata = {
  title: "Cricket - Log in"
}

import { Metadata } from "next";
import LoginActions from "./actions";

export default function Login() {
  return (
    <div className="font-Roboto h-screen w-screen bg-cover bg-no-repeat bg-login-bg flex justify-center items-center m-0">
      <div className="bg-white h-[500px] w-[550px] border-solid border-[1px] border-[#D9D9D9] rounded-[10px] flex flex-col">
        {/* HEADER */}
        <div className="pt-8 pb-2 h-fit w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl">
            <b>
              <span className="text-[#61DADA]">Welcome</span> to Cricket
            </b>
          </h1>
          <div className="text-center text-[15px] pt-4 leading-tight">
            <p>Catch every issue, every time.</p>
            <p>Login to your account or contact the admin for</p>
            <p>account creation.</p>
          </div>
        </div>

        {/* FORM */}
          <LoginActions />
      </div>
    </div>
  );
}
