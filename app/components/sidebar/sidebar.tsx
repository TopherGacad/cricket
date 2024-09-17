import Link from 'next/link'

export default function Sidebar(){
    return(
        <>
            <div className="h-full w-[100px] border-solid border-2 border-red-600 bg-red-700">
                    <ul>
                        <Link href="/dashboard"><li>Dashboard</li></Link>
                        <Link href="/dashboard/tickets/new-ticket"><li>Ticket</li></Link>
                        <Link href="/dashboard/setup"><li>Setup</li></Link>
                    </ul>
            </div>
        
       
           
        </>
    )
}