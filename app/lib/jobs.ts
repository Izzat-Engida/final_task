import {Posting,JobData} from '@/app/types/job'
export async function getAllJobPostings():Promise<Posting[]>{
    const res = await fetch(
    "https://akil-backend.onrender.com/opportunities/search",
    {
      cache: 'force-cache'
    }
  );
   let rdata: JobData;
 
  try {
    rdata = await res.json();
  } catch (e) {
    console.error("Response is not valid JSON:", e);
    throw new Error("Failed to parse job postings data as JSON.");
  }
  //console.log("got the data: ",res)
  if (!rdata || !Array.isArray(rdata.data)) {
    throw new Error("Job postings data is not in the expected format.");
  }
  const job_postings_with_index: Posting[] = rdata.data.map((job, index) => ({
    ...job,
    idString: job.id.toString(),
    id: index,
    isBookmarked:job.isBookmarked?? false,
    startDate: new Date(job.startDate),
    endDate: new Date(job.endDate),
    deadline: new Date(job.deadline),
    datePosted: new Date(job.datePosted),
    createdAt: new Date(job.createdAt),
    updatedAt: new Date(job.updatedAt),
  }));
  return job_postings_with_index;

}
export async function  getJobByIndex(index:number):Promise<Posting|undefined>{
    const jo=await getAllJobPostings();
    return jo.find(job=>job.id==index)
}