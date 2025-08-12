import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faClockRotateLeft,
  faFire,
  faLocationDot,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons'

type about = {
  datePosted: Date;
  deadline: Date;
  location: string;
  startDate: Date;
  endDate: Date;
};

type AboutShowProps = {
  data: about;
};

function AboutShow({ data }: AboutShowProps) {
  return (
    <div className='font-Epilogue text-[16px] leading-[1.6] flex flex-col gap-4'>

      {[
        {
          label: 'Posted On',
          icon: faClockRotateLeft,
          color: '#0066FF',
          value: new Date(data.datePosted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        },
        {
          label: 'Deadline',
          icon: faFire,
          color: '#FF5C5C',
          value: new Date(data.deadline).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        },
        {
          label: 'Location',
          icon: faLocationDot,
          color: '#0066FF',
          value: data.location
        },
        {
          label: 'Start Date',
          icon: faCalendarDays,
          color: '#0066FF',
          value: new Date(data.startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        },
        {
          label: 'End Date',
          icon: faCalendarDays,
          color: '#0066FF',
          value: new Date(data.endDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        },
      ].map(({ label, icon, color, value }, index) => (
        <div key={index} className='flex items-center gap-3 p-2'>
          <div
            className='w-[44px] h-[44px] flex items-center justify-center rounded-full'
            style={{ backgroundColor: `${color}1A` }} 
          >
            <FontAwesomeIcon icon={icon} color='#26A4FF' className='text-[20px]' />
          </div>
          <div>
            <div className='text-[#515B6F] text-sm'>{label}</div>
            <div className='text-[#25324B] font-semibold text-sm'>{value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AboutShow;
