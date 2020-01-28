import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import cors from "cors";

import { AppModule } from "./app.module";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
    }),
  );

  app.useStaticAssets(join(__dirname, "..", "public"));

  const options = new DocumentBuilder()
    .setTitle("CvSU Imus Web Portal API")
    .setDescription("A Web Scraping API for CvSU Imus Web Portal")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs/apis", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
