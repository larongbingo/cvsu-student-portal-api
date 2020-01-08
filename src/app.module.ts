import { Module } from "@nestjs/common";
import { StudentPortalModule } from "libs/cvsu-imus-portal/src";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [StudentPortalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
