import { Module, HttpModule } from "@nestjs/common";

import { StudentPortalService } from "./student-portal.service";
import { ParsedStudentPortalService } from "./parsed-student-portal.service";

@Module({
  imports: [HttpModule],
  providers: [StudentPortalService, ParsedStudentPortalService],
  exports: [StudentPortalService, ParsedStudentPortalService],
})
export class StudentPortalModule {}
