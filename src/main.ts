import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import cors from "cors";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cors({
    credentials: true,
  }));

  const options = new DocumentBuilder()
  .setTitle("CvSU Imus Web Portal API")
  .setDescription("A Web Scraping API for CvSU Imus Web Portal")
  .setVersion("0.1")
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
