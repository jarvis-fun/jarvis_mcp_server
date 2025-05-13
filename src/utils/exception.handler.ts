import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response, Request } from 'express';

interface ErrorResponse {
  status: HttpStatus;
  code: string;
  error: string;
  path: string;
  method: string;
  timeStamp: Date;
}

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse() as {
        message?: string | string[];
      };
      errorMessage = Array.isArray(errorResponse.message)
        ? errorResponse.message[0]
        : errorResponse.message || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = exception.message || 'error';
    }
    const code = getErrorCode(status);
    const errorResponse = this.getErrorResponse(
      status,
      errorMessage,
      request,
      exception,
      code,
    );

    this.getErrorLog(errorResponse, request, exception, code);

    response.status(status).send(errorResponse);
  }
  private getErrorLog = (
    errorResponse: ErrorResponse,
    request: Request,
    exception: HttpException | Error,
    code: string,
  ): string => {
    const { status, error } = errorResponse;
    const { method, url } = request;
    const stack = exception instanceof HttpException ? exception.stack : error;
    const responseError = JSON.stringify(errorResponse);
    const requestBody = JSON.stringify(request.body);
    const errorLog = `Response status: ${status} - Code: ${code} - Method: ${method} - URL: ${url}\n\nError:${responseError}\n\nRequest: ${requestBody}\n\n${stack}\n\n`;

    console.log('ERROR', errorLog);
    return errorLog;
  };

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
    exception: HttpException | Error,
    code: string,
  ) => ({
    status: status,
    code: code,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });
}

export function getErrorCode(status: number | string): string {
  status = status.toString();
  if (status === '401' || status === '403') {
    return ErrorCodes.BAD_REQUEST;
  } else if (status === '404') {
    return ErrorCodes.NOT_FOUND;
  } else if (status.match(/4\d\d/)) {
    return ErrorCodes.BAD_REQUEST;
  } else if (status === '200') {
    return ErrorCodes.OK;
  } else {
    return ErrorCodes.INTERNAL_ERROR;
  }
}

export class ErrorCodes {
  static INVALID_AUTHENTICATION = 'INVALID_AUTHENTICATION';
  static BAD_REQUEST = 'BAD_REQUEST';
  static INTERNAL_ERROR = 'INTERNAL_SERVER_ERROR';
  static CLIENT_ERROR = 'CLIENT_ERROR';
  static NOT_FOUND = 'NOT_FOUND';
  static VALIDATION_ERROR = 'VALIDATAION_ERROR';
  static OK = 'OK';
}
