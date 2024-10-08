import Buttons from "@/app/components/buttons/buttons";
import Tabs from "../../components/tabs/tabs";
import NewTicketAction from "./actions";
import { FaUpload } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creating new ticket"
}

export default function newTicket() {
  
  return (
    <>
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Tickets" />
        </div>

        <div className="h-[95%] flex items-center justify-center">

          <div className="flex flex-col justify-center items-center w-[70%] h-full">
            <h1 className="font-bold text-[60px] mb-10">
              <span className="text-[#61DADA]">Create</span> New Ticket
            </h1>

            <div className="h-[60%] w-[70%] border-[1px] border-solid border-[#C7C7C7] rounded-[5px]">
              <div className="border-b-[1px] pl-8 py-2 h-[8%]">
                <span className="text-[#797979] text-[14px] font-bold">
                  TICKET ID: TIK - ####
                </span>
              </div>

              <div className="flex flex-col items-center h-[92%]">
                {/* <form action="" id="new-ticket" className="w-full px-20">
                  <div className="flex items-center w-full justify-between my-8">
                    <label htmlFor="category" className="w-[15%] font-bold">Category:</label>
                   <NewTicketAction />
                  </div>

                  <div className="flex justify-between mb-8">
                    <label htmlFor="description" className="w-[15%] font-bold">Description:</label>
                    <textarea
                      required
                      maxLength={280}
                      id="description"
                      className="border-[1px] border-solid border-[#C7C7C7] text-[#797979] w-[60%] resize-none h-40 p-4 overflow-hidden focus:border-none focus:outline-none focus:ring focus:ring-[#61DADA]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="uplaod" className="w-[15%] font-bold">Attach File:</label>

                    <div className="w-[60%] relative cursor-pointer">
                      <input
                      id="upload"
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center border-[1px] border-solid border-[#C7C7C7] p-2 w-full cursor-pointer">
                        <FaUpload className="text-[#797979] text-center" />
                        <span className="ml-5 text-[#797979] text-center">Add attachment</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-5">
                    <Buttons fullWidth={false}>Submit</Buttons>
                  </div>
                  
                </form> */}
                <NewTicketAction/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
