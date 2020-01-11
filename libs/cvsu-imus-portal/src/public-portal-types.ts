export interface IAvailableSubject {
  subjectCode: string;
  subjectTitle: string;
  section: string;
  scheduleCode: string;
  units: string;
}

export interface IEnrolledStudent {
  studentNumber: string;
  fullName: string;
  course: string;
}

export interface IAvailableSubjectListResponse {
  draw: number;
  iTotalRecords: number;
  iTotalDisplayRecords: number;
  aaData: ISubject[];
}

export interface ISubject {
  subjectCode: string;
  description: string;
  section: string;
  schedcode: string;
  units: number;
  view: string;
}
