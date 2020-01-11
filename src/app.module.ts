import { Module } from "@nestjs/common";
import { CvsuImusPortalModule } from "libs/cvsu-imus-portal/src";

import { AppController } from "./app.controller";

@Module({
  imports: [CvsuImusPortalModule],
  controllers: [AppController],
})
export class AppModule {}
