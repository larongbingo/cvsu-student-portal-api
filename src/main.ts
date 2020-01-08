import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import cors from "cors";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cors({
    credentials: true,
  }));
  await app.listen(3000);
}
bootstrap();
