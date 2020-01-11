import { Module } from "@nestjs/common";
import { CvsuImusPortalModule } from "libs/cvsu-imus-portal/src";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [CvsuImusPortalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
