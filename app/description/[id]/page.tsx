import { getJobByIndex,getAllJobPostings } from "@/app/lib/jobs";
import { notFound } from "next/navigation";
import { ShowDetails } from "@/app/components/ShowDetails";
import { Posting } from "@/app/types/job";
type Detail={
  params:{
    id:string
  }
}
export async function generate(){
  const jobs=await getAllJobPostings();
  return jobs.map((jo,index)=>({
    id:index.toString()
  }));
}

export default async function JobDetail({params}:Detail) {
  const index=parseInt(params.id)
  const selected=await getJobByIndex(index)
  if(isNaN(index)||selected==undefined){
    notFound();
  }
  return (<ShowDetails job={selected}/>)
  
}