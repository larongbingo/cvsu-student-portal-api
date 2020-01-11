import { Module, HttpModule } from "@nestjs/common";

import { StudentPortalService } from "./student-portal.service";
import { ParsedStudentPortalService } from "./parsed-student-portal.service";
import { PublicPortalService } from "./public-portal.service";
import { ParsedPublicPortalService } from "./parsed-public-portal.service";

@Module({
  imports: [HttpModule],
  providers: [
    StudentPortalService,
    ParsedStudentPortalService,
    PublicPortalService,
    ParsedPublicPortalService,
  ],
  exports: [
    StudentPortalService,
    ParsedStudentPortalService,
    PublicPortalService,
    ParsedPublicPortalService,
  ],
})
export class CvsuImusPortalModule {}
