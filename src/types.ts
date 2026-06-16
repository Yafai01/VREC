export interface Notice {
  id: string;
  title: string;
  category: "Academic" | "Placement" | "Admissions" | "General" | "Exam";
  date: string;
  content: string;
  author: string;
  isImportant?: boolean;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  intake: number;
  hod: string;
  hodContact: string;
  email: string;
  labs: string[];
  description: string;
  syllabusHighlights: string[];
}

export interface PlacementStat {
  year: string;
  placedPercentage: number;
  offersCount: number;
  highestPackage: string;
  averagePackage: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AdmissionEnquiry {
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  marks12th: string;
  eamcetRank: string;
  message: string;
}
