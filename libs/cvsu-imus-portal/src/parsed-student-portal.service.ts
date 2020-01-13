import { Injectable, Logger } from "@nestjs/common";
import cheerio from "cheerio";

import { StudentPortalService } from "./student-portal.service";

@Injectable()
export class ParsedStudentPortalService {
  constructor(private readonly studentPortalService: StudentPortalService) {}

  public async GetParsedGrades(sessionId: string) {
    const response = await this.studentPortalService.GetGrades(sessionId);
    const $ = cheerio.load(response.data, { normalizeWhitespace: true });
    const subjects = [];
    $("#accordion").each((i, element) =>
      $(element)
        .find(".collapse .card-body .table-responsive small #grades tbody tr")
        .each((j, innerElement) => {
          const subject = {
            subjectCode: "",
            subjectTitle: "",
            grade: "",
            completion: "",
            unit: "",
            creditUnit: "",
          };
          $(innerElement).each((k, innerInnerElement) =>
            $(innerInnerElement)
              .children()
              .each((l, innerInnerInnerElement) => {
                const elementText = $(innerInnerInnerElement)
                  .text()
                  .replace(/\t/g, "")
                  .replace(/\n/g, "");
                switch (l) {
                  case 0:
                    subject.subjectCode = elementText;
                    break;
                  case 1:
                    subject.subjectTitle = elementText;
                    break;
                  case 2:
                    subject.grade = elementText;
                    break;
                  case 3:
                    subject.completion = elementText;
                    break;
                  case 4:
                    subject.unit = elementText;
                    break;
                  case 5:
                    subject.creditUnit = elementText;
                    break;
                }
              }),
          );
          subjects.push(subject);
        }),
    );
    Logger.log(subjects);
    return subjects;
  }

  public async GetParsedProfile(sessionId: string) {
    const response = await this.studentPortalService.GetStudentProfile(
      sessionId,
    );
    const $ = cheerio.load(response.data, { normalizeWhitespace: true });
    const profile: IProfile = {
      personalDetails: {
        fullName: "",
        birthDate: "",
        sex: "",
        religion: "",
        civilStatus: "",
      },
      contactDetails: {
        address: "",
        emailAddress: "",
        contactNumber: "",
        guardian: "",
      },
      enrollmentDetails: {
        course: "",
        studentNumber: "",
      },
    };
    $("input").each((i, ele) => {
      switch (i) {
        case 1:
          profile.personalDetails.fullName = $(ele).attr("value");
          break;
        case 2:
          profile.personalDetails.birthDate = $(ele).attr("value");
          break;
        case 3:
          profile.personalDetails.sex = $(ele).attr("value");
          break;
        case 4:
          profile.personalDetails.religion = $(ele).attr("value");
          break;
        case 5:
          profile.personalDetails.civilStatus = $(ele).attr("value");
          break;

        case 6:
          profile.contactDetails.address = $(ele).attr("value");
          break;
        case 7:
          profile.contactDetails.guardian = $(ele).attr("value");
          break;
        case 8:
          profile.contactDetails.contactNumber = $(ele).attr("value");
          break;
        case 9:
          profile.contactDetails.emailAddress = $(ele).attr("value");
          break;

        case 10:
          profile.enrollmentDetails.course = $(ele).attr("value");
          break;
        case 11:
          profile.enrollmentDetails.studentNumber = $(ele).attr("value");
          break;
      }
    });
    return profile;
  }

  public async GetParsedAccountBalance(sessionId: string) {
    const response = await this.studentPortalService.GetAccountBalance(sessionId);
    const $ = cheerio.load(response.data, { normalizeWhitespace: true });
  }

  public async GetParsedEnrolledSubjects(sessionId: string) {
    const response = await this.studentPortalService.GetEnrolledSubjects(sessionId);
    const $ = cheerio.load(response.data, { normalizeWhitespace: true });
  }
}
