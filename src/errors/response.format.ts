import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseFormatService {
  buildResponse(data: any, errorMessage?: string) {
    return {
      error: errorMessage ?? null,
      data,
    };
  }
}
