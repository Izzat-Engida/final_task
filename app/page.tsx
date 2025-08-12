import { Posting } from "./types/job";
import ClientSorter from "./components/ClientSorter";
import { getAllJobPostings } from "./lib/jobs";
import { getServerSession } from "next-auth";
import LogoutButton from "./components/Log";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
export default async function Home() {
  const data: Posting[] = await getAllJobPostings();
  const session = await getServerSession(authOptions);
  return (
    <div className="gap-[40px] pt-[72px] pb-[72px] pl-[124px] pr-[123px]"> 
        <div>
          {session && <div> <p>Logged in as {session?.user?.name}</p>
           <p>Email: {session?.user?.email}</p></div>}
          <LogoutButton />
        <div className="mb-4 flex items-center justify-between">
           <ClientSorter jobs={data}/>
        </div>
        </div>
    </div>
  );
}
