import { Module } from "@nestjs/common";
import { StudentPortalService } from "./student-portal.service";

@Module({
  providers: [StudentPortalService],
  exports: [StudentPortalService],
})
export class StudentPortalModule {}
