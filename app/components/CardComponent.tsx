'use client';

import Link from 'next/link';
import { Posting } from '../types/job';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Catagories from './catagories';
import { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';


type Props = {
  job: Posting;
  index: number;

};

 export default function  CardComponent({ job, index }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const {data:session,status}=useSession();
  const [loading,setLoading]=useState(false);
useEffect(() => {
    const checkBookmark = async () => {
      if (status === 'authenticated' && session?.accessToken) {
        try {
          const res = await fetch('https://akil-backend.onrender.com/bookmarks', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          if (!res.ok) {
            throw new Error(`Failed to fetch bookmarks: ${res.status} ${res.statusText}`);
          }
          const data = await res.json();
          //console.log('Bookmarks response:', data);
          if (data.data.some((bookmark: any) => bookmark.eventID === job.idString)) {
            setBookmarked(true);
          }
        } catch (error) {
          console.error('Error checking bookmarks:', error);
        
        }
      }
      else{
        alert('You are not logged in');
      }
    };
    checkBookmark();
  }, [status, session, job.idString]);

  const handle = async () => {
    if (status !== 'authenticated') {
      return;
    }



    setLoading(true);
    try {
      const endpoint = `https://akil-backend.onrender.com/bookmarks/${job.idString}`;
      const method = bookmarked ? 'DELETE' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: method === 'POST' ? '{}' : undefined,
      });

      if (!res.ok) {
        
        throw new Error('Bookmark operation failed');
      }

      setBookmarked(!bookmarked);
  
    } catch (error: any) {
    
      console.error('Bookmark error details:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[919px] h-auto rounded-[30px] border border-[#D6DDEB] bg-white p-[24px] m-[20px]">
      <div className="relative left-[800px] text-3xl">
        {session && <button onClick={handle}
    disabled={loading}
    className="text-[#2a467a]"
    data-testid="bookmark-btn"
    aria-pressed={bookmarked}
    >
         {bookmarked? <FaBookmark/>:<FaRegBookmark/>}
        </button>}
        
      </div>

      <Link href={`/description/${index}`}>
        <div className="flex items-start gap-[24px]">
          <img src={job.logoUrl} alt="Job" width={50} height={50} className="rounded-[10px]" />
          <div>
            <div className="font-Epilogue">
              <div className="text-[20px] font-[600] leading-[1.2]">{job.title}</div>
              <div className="text-[16px] font-[400] leading-[1.6] text-[#7C8493]">
                <span>{job.orgName}</span>
                <ul className="list-disc p-4 m-0 inline-block">
                  <li>{job.location}</li>
                </ul>
              </div>
            </div>
            <p className="font-Epilogue font-[400] leading-[1.6] text-[#25324B]">{job.description}</p>
            <div className="flex flex-wrap gap-2">
              {job.categories.map((cata, i) => (
                <Catagories key={i} data={cata} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}