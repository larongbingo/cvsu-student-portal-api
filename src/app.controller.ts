import { Controller, Get, Query, Logger } from "@nestjs/common";
import { ParsedStudentPortalService, ParsedPublicPortalService, StudentPortalService } from "cvsu-imus/student-portal";

@Controller()
export class AppController {
  constructor(
    private readonly studentPortalService: StudentPortalService,
    private readonly parsedStudentPortalService: ParsedStudentPortalService,
    private readonly parsedPublicPortalService: ParsedPublicPortalService,
  ) {}

  @Get("/login")
  public async GetSessionId(
    @Query("studNum") studNum: string,
    @Query("password") password: string,
  ) {
    const sessionId = await this.studentPortalService.LogIn(studNum, password);
    return {sessionId};
  }

  @Get("/grades")
  public async GetGrades(@Query("sessionId") sessionId: string) {
    const grades = await this.parsedStudentPortalService.GetParsedGrades(sessionId);
    return { grades };
  }

  @Get("/profile")
  public async GetProfiles(@Query("sessionId") sessionId: string) {
    const profile = await this.parsedStudentPortalService.GetParsedProfile(sessionId);
    return { profile };
  }
}
