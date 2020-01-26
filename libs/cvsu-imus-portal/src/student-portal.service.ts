import { Injectable, HttpService } from "@nestjs/common";
import { parse } from "cookie";
import { stringify } from "querystring";

@Injectable()
export class StudentPortalService {
  constructor(private readonly httpService: HttpService) {
    httpService.axiosRef.defaults.withCredentials = true;
    httpService.axiosRef.defaults.xsrfCookieName = null;
    httpService.axiosRef.defaults.xsrfHeaderName = null;
    httpService.axiosRef.defaults.headers.Connection = "keep-alive";
    httpService.axiosRef.defaults.headers["Cache-Control"] = "no-cache";
    httpService.axiosRef.defaults.headers.Host = "cvsu-imus.edu.ph";
    httpService.axiosRef.defaults.headers.Referer =
      "https://cvsu-imus.edu.ph/student-portal/home";
    httpService.axiosRef.defaults.headers.Accept = "*/*";
  }

  /**
   * Sends the credentials to the Student Portal and retrieves your session id
   * Your session id will be used to other actions in the student portal.
   * @param studentNumber Your student number in the school; found in your card and school docs
   * @param password
   * @returns Session Id from the CvSU Web Portal
   */
  public async LogIn(studentNumber: string, password: string) {
    const LOGIN_URL = "https://cvsu-imus.edu.ph/student-portal/index?verify=1";
    const loginFormData = {
      studnum: studentNumber,
      userpass: password,
    };
    const response = await this.httpService
      .post<string>(LOGIN_URL, stringify(loginFormData), {
        headers: {
          Referer: "https://cvsu-imus.edu.ph/student-portal/index",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .toPromise();
    return parse(response.headers["set-cookie"][0]).PHPSESSID;
  }

  public async LogOut(sessionId: string) {
    const LOGOUT_URL = "https://cvsu-imus.edu.ph/student-portal/logout";
    await this.httpService
      .get(LOGOUT_URL, {
        headers: {
          Cookie: "PHPSESSID=" + sessionId,
        },
      })
      .toPromise();
  }

  public async GetAccountBalance(sessionId: string) {
    const ACCOUNT_BALANCE_URL =
      "https://cvsu-imus.edu.ph/student-portal/account-balance";
    const response = await this.httpService
      .get<string>(ACCOUNT_BALANCE_URL, {
        headers: {
          Cookie: "PHPSESSID=" + sessionId,
        },
      })
      .toPromise();
    return response;
  }

  public async GetEnrolledSubjects(sessionId: string) {
    const ENROLLED_SUBJECTS_URL =
      "https://cvsu-imus.edu.ph/student-portal/enrolled-subjects";
    const response = await this.httpService
      .get<string>(ENROLLED_SUBJECTS_URL, {
        headers: {
          Cookie: "PHPSESSID=" + sessionId,
        },
      })
      .toPromise();
    return response;
  }

  public async GetGrades(sessionId: string) {
    const GRADES_URL = "https://cvsu-imus.edu.ph/student-portal/grades";
    const response = await this.httpService
      .get<string>(GRADES_URL, {
        headers: {
          Cookie: "PHPSESSID=" + sessionId,
        },
      })
      .toPromise();
    return response;
  }

  public async GetStudentProfile(sessionId: string) {
    const PROFILE_URL = "https://cvsu-imus.edu.ph/student-portal/profile";
    const response = await this.httpService
      .get<string>(PROFILE_URL, {
        headers: {
          Cookie: "PHPSESSID=" + sessionId,
        },
      })
      .toPromise();
    return response;
  }
}
