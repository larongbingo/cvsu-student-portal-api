import { Controller, Get, Query } from "@nestjs/common";
import { ParsedStudentPortalService, ParsedPublicPortalService, StudentPortalService, PublicPortalService } from "cvsu-imus/student-portal";

@Controller()
export class AppController {
  constructor(
    private readonly studentPortalService: StudentPortalService,
    private readonly parsedStudentPortalService: ParsedStudentPortalService,
    private readonly parsedPublicPortalService: ParsedPublicPortalService,
    private readonly publicPortalService: PublicPortalService,
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

  @Get("/balance")
  public async GetBalance(@Query("sessionId") sessionId: string) {
    const balance = await this.parsedStudentPortalService.GetParsedAccountBalance(sessionId);
    return { balance };
  }

  @Get("/enrolledSubjects")
  public async GetEnrolledSubject(@Query("sessionId") sessionId: string) {
    const enrolledSubjects = await this.parsedStudentPortalService.GetParsedEnrolledSubjects(sessionId);
    return { enrolledSubjects };
  }

  @Get("/studentsEnrolled")
  public async GetEnrolledStudentsInSchedule(@Query("scheduleCode") scheduleCode: number) {
    const students = await this.parsedPublicPortalService.GetParsedStudentsEnrolledInSubject(scheduleCode);
    return { students };
  }

  @Get("/subjects")
  public async GetSubjects(@Query("startingId") startingId: number, @Query("length") length: number) {
    const subjects = await this.publicPortalService.GetListOfSubjects(startingId, length);
    return { subjects: subjects.data.aaData };
  }
}
