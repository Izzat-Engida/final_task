import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardComponent from "../app/components/CardComponent";
import { Posting } from "../app/types/job";
import { useSession } from "next-auth/react";

// Mock next-auth's useSession
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

const mockedUseSession = useSession as jest.Mock;

// Mock job data
const mockJob: Posting = {
  idString: "8249864f654a65",
  id: 1,
  title: "some job",
  description: "doing some kind of job",
  responsibilities: "doing something the user paid to do",
  idealCandidate: "the person who does the job",
  categories: ["category1", "category2"],
  opType: "full-time",
  startDate: new Date(),
  endDate: new Date(),
  deadline: new Date(),
  location: ["location1", "location2"],
  requiredSkills: ["skill1", "skill2"],
  whenandWhere: "when and where",
  orgId: "orgid",
  datePosted: new Date(),
  status: "open",
  applicantCount: 0,
  viewsCount: 0,
  orgName: "orgname",
  logoUrl: "logourl",
  isBookmarked: false,
  isRolling: false,
  questions: [],
  perksAndBenefits: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  orgPrimaryPhone: "1234567890",
  orgEmail: "email",
  average_rating: 0,
  total_reviews: 0,
  requirements: "",
};

describe("CardComponent", () => {
  beforeEach(() => {
    mockedUseSession.mockReturnValue({
      data: { user: { name: "Test User" }, accessToken: "fake-token" },
      status: "authenticated",
    });
  });

  it("renders job title", () => {
    render(<CardComponent job={mockJob} index={0} />);
    expect(screen.getByText(/some job/i)).toBeInTheDocument();
  });

  it("renders bookmark button if authenticated", () => {
    render(<CardComponent job={mockJob} index={0} />);
    const bookmarkButton = screen.getByRole("button");
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("toggles bookmark state when clicked", () => {
    render(<CardComponent job={mockJob} index={0} />);

    const bookmarkButton = screen.getByRole("button");

    
    expect(bookmarkButton).toHaveAttribute("data-bookmarked", "false");


    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toHaveAttribute("data-bookmarked", "true");

    
    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toHaveAttribute("data-bookmarked", "false");
  });
});
