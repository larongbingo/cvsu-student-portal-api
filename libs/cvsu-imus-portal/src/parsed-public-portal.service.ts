import { Injectable, Logger } from "@nestjs/common";
import cheerio from "cheerio";

import { PublicPortalService } from "./public-portal.service";
import { IEnrolledStudent } from "./public-portal-types";

@Injectable()
export class ParsedPublicPortalService {
  constructor(private readonly publicPortalService: PublicPortalService) {}

  public async GetParsedStudentsEnrolledInSubject(scheduleCode: number) {
    const response = await this.publicPortalService.GetStudentsEnrolledInSubject(
      scheduleCode,
    );
    const students: IEnrolledStudent[] = [];

    const $ = cheerio.load(response.data);

    $("tr").each((i, ele) => {
      const student: IEnrolledStudent = {
        studentNumber: "",
        fullName: "",
        course: "",
      };

      $(ele)
        .children()
        .each((j, innerEle) => {
          switch (j) {
            case 1:
              student.studentNumber = $(innerEle).text();
              break;
            case 2:
              student.fullName = $(innerEle).text();
              break;
            case 3:
              student.course = $(innerEle).text();
              break;
          }
        });
      students.push(student);
    });

    return students.slice(1);
  }
}
