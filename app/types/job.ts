export type Person={
  name:string;
  email:string;
  password:string;
  confirmPassword:string;
  role?:string;
}
export type Posting = {
  idString:string;
  id: number;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  location: string[];
  requiredSkills: string[];
  whenandWhere: string;
  orgId: string;
  datePosted: Date;
  status: string;
  applicantCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: any; 
  perksAndBenefits: any;
  createdAt: Date;
  updatedAt: Date;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
};

export type JobData = {
  success: boolean;
  message: string;
  data: Posting[];
};
