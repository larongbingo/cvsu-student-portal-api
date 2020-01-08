import { Injectable, Logger } from "@nestjs/common";
import { ParsedStudentPortalService, StudentPortalService } from "libs/cvsu-imus-portal/src";

@Injectable()
export class AppService {
  constructor(
    private readonly parsedStudentPortalService: ParsedStudentPortalService,
    private readonly studentPortalServie: StudentPortalService,
  ) {}
  async getHello() {
    const sessionId = await this.studentPortalServie.LogIn("201510310", "larongbingo123");
    Logger.log(sessionId);
    const grades = await this.parsedStudentPortalService.GetParsedGrades(sessionId);
    Logger.log(grades);
    const profile = await this.studentPortalServie.GetStudentProfile(sessionId);
    Logger.log(profile.data);
    return "Hello World!";
  }
}
