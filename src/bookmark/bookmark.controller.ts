import { Controller, Get, Query } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('me')
  async getBookmarksByUserId(
    @Query('userId') userId: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.bookmarkService.getBookmarksByUserId(userId, pageNumber, pageSize);
  }
}