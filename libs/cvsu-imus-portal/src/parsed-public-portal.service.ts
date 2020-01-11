import { Injectable, Logger } from "@nestjs/common";
import cheerio from "cheerio";

import { PublicPortalService } from "./public-portal.service";

@Injectable()
export class ParsedPublicPortalService {
  constructor(private readonly publicPortalService: PublicPortalService) {}

  public async GetParsedStudentsEnrolledInSubject(scheduleCode: number) {
    const response = await this.publicPortalService.GetStudentsEnrolledInSubject(
      scheduleCode,
    );
    const students = [];

    const $ = cheerio.load(response.data);

    $("tr").each((i, ele) => {
      const student = [];
      $(ele)
        .children()
        .each((j, innerEle) => student.push($(innerEle).text()));
      students.push(student);
    });

    return students;
  }
}
