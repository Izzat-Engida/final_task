'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession(); 
  const [modalOpen, setModalOpen] = useState(false); 
  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const goToSignIn = () => {
    window.location.href = '/api/auth/signin'; 
  };
  return (
    <>
      <div>
        {session ? (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-white bg-red-600 px-4 py-2 rounded m-5"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={showModal}
            className="text-white bg-red-600 px-4 py-2 rounded m-5"
          >
            Login
          </button>
        )}
      </div>
      <div
        id="signInModal"
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ${modalOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-white p-5 rounded-lg max-w-md w-11/12 text-center shadow-lg">
          <p className="mb-5 text-base text-gray-800">
            You are not logged in. Please sign in to access all features. Some features are blocked without signing in.
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