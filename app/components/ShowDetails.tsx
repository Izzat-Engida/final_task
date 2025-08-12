import React from "react";
import { Posting } from "../types/job";
import AboutShow from "./AboutShow";
import Catagories from "./catagories";
import RequiredSkill from "./RequiredSkill";
import { FaCheckCircle} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

type Deatil = {
    job: Posting;
};

export function ShowDetails({ job }: Deatil) {
    return (
        <div className="flex gap-[62px] p-[32px]">
        
            <div className="w-2/3 space-y-8 py-[46px]">
                <div>
                    <p className="font-Poppins font-[900] text-[24px] text-[#25324B]">
                        {job.title}
                    </p>
                    <p className="font-Epilogue font-[400] text-[16px] text-[#25324B] mt-2">
                        {job.description}
                    </p>
                </div>

                <div>
                    <p className="font-Poppins font-[900] text-[24px] text-[#25324B] mb-2">
                        Responsibilities
                    </p>
                    <ul className="space-y-2">
                        {job.responsibilities.split('\n').map((res, index) => (
                            <li key={index} className="flex items-start gap-2 text-[#25324B]">
                                <FaCheckCircle className="mt-1 text-green-500" />
                                <span>{res}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="font-Poppins font-[900] text-[24px] text-[#25324B] mb-2">
                        Ideal Candidate
                    </p>
                    <ul className="list-disc ml-6 space-y-2 text-[16px] text-[#25324B]">
                        <li>
                            <span className="font-semibold">
                                {job.idealCandidate}
                            </span>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <p className="font-Poppins font-[900] text-[24px] text-[#25324B] mb-2">
                        When & Where
                    </p> 
                    <div className="flex gap-5">
                        <FontAwesomeIcon icon={faLocationDot} height={50} width={50} color="#26A4FF" /><span className="text-[16px] leading-[1.6] font-[400] text-[#25324B]">
                            {job.whenandWhere || job.location }</span> 
                        
                    </div>
                </div>
            </div>

            
            <div className="w-1/3 space-y-6">
                <div>
                    <p className="font-Poppins font-[600] text-[24px] text-[#25324B] mb-2">
                        About
                    </p>
                    <AboutShow data={{
                        datePosted:job.datePosted,
                        deadline:job.deadline,
                        location:job.location.join(', '),
                        startDate:job.startDate,
                        endDate:job.endDate
                    }} />
                </div>

                <div>
                    <p className="font-Poppins font-[600] text-[24px] text-[#25324B] mb-2">
                        Categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {job.categories.map((cata, index) => (
                            <Catagories key={index} data={cata} />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-Poppins font-[600] text-[24px] text-[#25324B] mb-2">
                        Required Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((req, index) => (
                            <RequiredSkill key={index} data={req} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
