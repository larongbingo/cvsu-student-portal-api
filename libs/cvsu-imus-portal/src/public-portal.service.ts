import { Injectable, HttpService } from "@nestjs/common";
import { SubjectQueryString } from "./constants/subject.query.string";
import { IAvailableSubjectListResponse } from "./public-portal-types";

@Injectable()
export class PublicPortalService {
  constructor(private readonly httpService: HttpService) {}

  public async GetListOfSubjects(
    startingIndex: number = 1,
    numberOfSubjects: number = 25,
  ) {
    const LIST_SUBJECTS_URL =
      "https://cvsu-imus.edu.ph/admission-academics/subject-load.php";
    const response = await this.httpService
      .post<IAvailableSubjectListResponse>(
        LIST_SUBJECTS_URL,
        SubjectQueryString(startingIndex, numberOfSubjects),
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .toPromise();
    return response;
  }

  public async GetStudentsEnrolledInSubject(scheduleCode: number) {
    const ENROLLED_STUDENTS_URL = `https://cvsu-imus.edu.ph/admission-academics/enrolled-students?schedule-code=${scheduleCode}`;
    const response = await this.httpService
      .get<string>(ENROLLED_STUDENTS_URL)
      .toPromise();
    return response;
  }
}
