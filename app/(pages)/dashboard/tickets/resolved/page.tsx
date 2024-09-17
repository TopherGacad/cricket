import Link from "next/link";

export default function resolved() {
    return (
      <>
      <div>
        <div className="w-[500px] h-[50px] border-solid border-[1px] border-gray-600">
          <ul className="flex justify-around items-center">
              <Link href="/dashboard/tickets/new-ticket"><li>New Ticket</li></Link>
              <Link href="/dashboard/tickets/queue"><li>Queue</li></Link>
              <Link href="/dashboard/tickets/resolved"><li>Resolved</li></Link>
          </ul>
        </div>

        <h1>RESOLVED TICKET HERE</h1>
      </div>
    </>
    );
  }