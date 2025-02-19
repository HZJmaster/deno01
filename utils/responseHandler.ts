export class ResponseHandler {
  static successRes(data: unknown = null, msg: string = "") {
    return {
      code: 200,
      data,
      msg,
    };
  }

  static failRes(msg: string = "") {
    return {
      code: 500,
      msg,
    };
  }
}
