export class ResponseFormat {
  static buildResponse(data: any, errorMessage?: string) {
    return {
      error: errorMessage ?? null,
      data,
    };
  }
}