import { Module } from "@nestjs/common";
import { StudentPortalModule } from "cvsu-imus/student-portal";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [StudentPortalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
