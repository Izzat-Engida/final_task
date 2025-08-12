'use client';
import { useState, useEffect } from "react";
import { Posting } from "../types/job";
import CardComponent from "./CardComponent";
import BookMarkComponent from "./Bookmarked";


type Props = {
  jobs: Posting[];
};

export default function ClientSorter({ jobs}: Props) {
  const [sortOption, setSortOption] = useState("newest");
  const [sortedJobs, setSortedJobs] = useState<Posting[]>([]);
  const [booked,setbooked]=useState(false)
  useEffect(() => {
    
    var sorted=jobs
    const sortJobs = () => {
       sorted = [...jobs].sort((a, b) => {
        if (sortOption === "newest") {
          return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
        } else if (sortOption === "oldest") {
          return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
        } else if (sortOption === "deadline") {
          return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
        }
        return 0;
      });
  
      setSortedJobs(sorted);
    };
    sortJobs();
  }, [sortOption, jobs]);

  return (
    <div className="pl-50">
      <div className="flex justify-between items-center mb-8">
        <div className="px-5">
          <p className="font-Poppins font-[900] text-[32px] text-[#25324B]">Opportunities</p>
          <p className="font-Epilogue font-[400] text-[16px] text-[#7C8493]">
            Showing {sortedJobs.length} results
          </p>
        </div>
        <div className="flex items-center pr-50 ">
          <label className="text-[#25324B] font-medium">Sort by:</label>
           <select
            className="border border-[#ccc] rounded px-4 py-2 text-sm text-[#25324B]"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="deadline">Nearest Deadline</option>
          </select>
          {/* <button onClick={() => setbooked(!booked)}>{booked?"show Bookmarks":"Show All"}</button> */}
        </div>

      </div>
      
      <div className="item-center">
        {sortedJobs.map((job, index) => (
          <CardComponent key={job.id} job={job} index={index}/>
        ))}
      </div>
    </div>
  );
}
