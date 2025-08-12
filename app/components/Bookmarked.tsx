'use client';

import Link from 'next/link';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Catagories from './catagories';
import { Posting } from '../types/job';

type Props = {
  job: Posting;
  index: number;
};

export default function BookMarkComponent({ job, index }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

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
          if (data.data.some((bookmark: any) => bookmark.eventID === job.idString)) {
            setBookmarked(true);
          }
        } catch (error) {
          console.error('Error checking bookmarks:', error);
          setError('Failed to load bookmark status.');
        }
      }
    };
    checkBookmark();
  }, [status, session, job.idString]);

  const handleBookmark = async () => {
    if (status !== 'authenticated') {
      setModalOpen(true); // Show modal for unauthenticated users
      return;
    }

    setLoading(true);
    setError(null);
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
      setError('Failed to update bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToSignIn = () => {
    window.location.href = '/signin';
  };

  return (
    <>
      <div className="w-[919px] h-auto rounded-[30px] border border-[#D6DDEB] bg-white p-[24px] m-[20px]">
        {bookmarked && (
          <div className="relative left-[800px] text-3xl">
            <button
              onClick={handleBookmark}
              disabled={loading}
              className="text-[#2a467a]"
              aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        )}

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
              {bookmarked && (
                <div className="flex flex-wrap gap-2">
                  {job.categories.map((cata, i) => (
                    <Catagories key={i} data={cata} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Modal for unauthenticated users */}
      <div
        id="signInModal"
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ${modalOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-white p-5 rounded-lg max-w-md w-11/12 text-center shadow-lg">
          <p className="mb-5 text-base text-gray-800">
            You are not logged in. Please sign in to bookmark jobs. Some features are blocked without signing in.
          </p>
          <div className="flex justify-center gap-2.5">
            <button
              onClick={goToSignIn}
              className="bg-blue-600 text-white px-5 py-2.5 rounded text-sm cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-600 text-white px-5 py-2.5 rounded text-sm cursor-pointer hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fixed {
          display: none;
        }
        .block {
          display: flex;
        }
      `}</style>
    </>
  );
}