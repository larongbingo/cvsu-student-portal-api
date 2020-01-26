
export interface ISubject {
  subjectCode: string;
  subjectTitle: string;
  grade: string;
  completion: string;
  unit: string;
  creditUnit: string;
}

export interface IProfile {
  personalDetails: {
    fullName: string;
    birthDate: string;
    sex: string;
    religion: string;
    civilStatus: string;
  };

  contactDetails: {
    address: string;
    guardian: string;
    contactNumber: string;
    emailAddress: string;
  };

  enrollmentDetails: {
    course: string;
    studentNumber: string;
  };
}

export interface IEnrolledSubjects {
  enrolledSubject: IEnrolledSubjects[];
}

export interface IEnrolledSubject {
  scheduleCode: string;
  subjectCode: string;
  subjectTitle: string;
  schedule: Array<{
    time: string;
    day: string;
    room: string;
  }>;
  section: string;
  instructor: string;
}

export interface IBalance {
  fees: string;
  amount: number;
  paid: number;
  balance: number;
}
