import React,{useMemo} from 'react'
type Catagori={
    data: string;
}
const commonColors = [
  { bg: 'bg-blue-100', text: 'text-blue-800' },
  { bg: 'bg-green-100', text: 'text-green-800' },
  { bg: 'bg-purple-100', text: 'text-purple-800' },
  { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  { bg: 'bg-pink-100', text: 'text-pink-800' },
  { bg: 'bg-red-100', text: 'text-red-800' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  { bg: 'bg-teal-100', text: 'text-teal-800' },
];
function Catagories({data}:Catagori) {
     const { bg, text } = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * commonColors.length);
    return commonColors[randomIndex];
  }, []);
  return (
    <div className={`flex justify-center items-center h-[31px] w-auto rounded-[30px]  px-[10px] py-[6px]
    font-[600] text-[12px] leading-[1.6] font-Epilogue
    ${bg} ${text}
    `}>
      {data}
    </div>
  )
}

export default Catagories
