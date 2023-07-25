import { Response } from "express";

class CookieService {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  public setCookie = ({ name, value }: { name: string; value: string }) => {
    return this.res.cookie(name, value, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 604800000),
    });
  };
}

export default CookieService;
