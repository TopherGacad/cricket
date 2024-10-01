import Tabs from "../../components/tabs/tabs";

export default function queue() {
  return (
    <>
      <div className="bg-white w-full h-full">
        <div className="h-[5%]">
          <Tabs variant="Tickets" /> 
        </div>

        <div className="h-[95%]">
          <div>
            {/* title */}
            <h1>
              <span>TICKETS</span> QUEUE
            </h1>
          </div>

          <div>{/* container header */}</div>

          <div>{/* form */}</div>
          {/* form container */}
        </div>
      </div>
    </>
  );
}
