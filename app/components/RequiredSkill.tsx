import React from 'react'
type Catagori={
    data: string;
}
function RequiredSkill({data}:Catagori) {
  return (
      <div className='flex justify-center items-center h-[31px] w-auto rounded-[30px]  px-[12px] py-[4px]
    font-[400] text-[16px] leading-[1.6] font-Epilogue text-[#4640DE]
    bg-[#F8F8FD]
    '>
      {data}
    </div>
  )
}

export default RequiredSkill
