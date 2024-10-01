import Tabs from "../../components/tabs/tabs";
import NewTicketAction from "./actions";

export default function newTicket() {
  return (
    <>
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Tickets" />
        </div>

        <div className="h-[95%] flex items-center justify-center">
          <div className="flex flex-col items-center w-[70%] h-[90%]">
            <h1 className="font-bold text-[60px] my-8">
              <span className="text-[#61DADA]">Create</span> New Ticket
            </h1>

            <div className="h-[60%] w-[70%] border-[1px] border-solid border-[#C7C7C7] rounded-[5px]">
              <div className="border-b-[1px] pl-8 py-2">
                <span className="text-[#797979] text-[14px] font-bold">
                  TICKET ID#: TIK-0000
                </span>
              </div>

              <div>
                <form action="" id="new-ticket">
                  <div className="flex items-center justify-center space-between">
                    <label htmlFor="category">Category:</label>
                   <NewTicketAction />
                  </div>

                  <div className="flex items-center justify-center space-between">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      className="border-solid border-[1px] border-gray-400 "
                    />
                  </div>

                  <div className="flex items-center justify-center space-between">
                    <label htmlFor="file">Attach File:</label>
                    <input
                      id="file"
                      type="file"
                      className="border-solid border-[1px] border-gray-400 "
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
