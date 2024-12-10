
type ExceptionType = "EmailConflictException" | "UserNotFoundException" | "IncorrectCodeException" | "CodeExpiredException";

export class Exception extends Error {

  type: ExceptionType;
  statusCode?: number;
  constructor(
    error?: any | unknown,
  ) {
    let statusCode: number;
    let message: string;
    if (error) {
      { statusCode = error.statusCode }
      { message = error.message }
    }
    else {
      statusCode = 500;
      message = "Something went wrong";
    }
    super(message);
    this.name = this.constructor.name;
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
    this.type = this.constructor.type ?? "Exception";
    this.statusCode = statusCode;
  }


}
export class EmailConflictException extends Exception {
  static type = "EmailConflictException"
}

export class UserNotFoundExecption extends Exception {
  static type = "UserNotFoundException"
}

export class IncorrectCodeException extends Exception {
  static type = "IncorrectCodeException"
}

export class CodeExpiredException extends Exception {
  static type = "CodeExpiredException"
}