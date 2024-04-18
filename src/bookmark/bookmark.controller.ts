import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { ResponseFormat } from "src/errors/response.format";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CreateBookmarkDto } from "./dto/create.bookmark.dto";

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // 북마크 전체 조회(유저)
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getBookmarksByUserId(@Req() req, @Query('pageNumber') pageNumber: number, @Query('pageSize') pageSize: number) {
    const userId = req.user.userId;
    const bookmarks = await this.bookmarkService.getBookmarksByUserId(userId, pageNumber, pageSize);
    return ResponseFormat.buildResponse(bookmarks);
  }
// 북마크 추가 (유저)
@Post()
@UseGuards(JwtAuthGuard)
async postBookmark(@Body() createBookmarkDto: CreateBookmarkDto, @Req() req) {
  const userId = req.user.userId;
  const { placeId } = createBookmarkDto; 
  const newBookmark = await this.bookmarkService.createBookmark(userId, placeId); 
  return ResponseFormat.buildResponse(newBookmark);
}


  // 북마크 삭제 (유저)
  @Delete(':bookmarkId')
  async deleteBookmark(@Param('bookmarkId') bookmarkId: string) {
    const deletedBookmark = await this.bookmarkService.deleteBookmark(bookmarkId);
    return ResponseFormat.buildResponse(deletedBookmark);
  }

  // 북마크 많은 순으로 정렬(장소)
  @Get()
  async getMostBookmarkedPlaces() {
    const mostBookmarkedPlaces = await this.bookmarkService.getMostBookmarkedPlaces();
    return ResponseFormat.buildResponse(mostBookmarkedPlaces);
  }

  // 북마크 확인 GET /bookmarks/check?placeId=value
  @Get('check')
  //@UseGuards(AuthGuard('jwt'))
  async getBookmark(@Query('placeId') placeId: string, @Req() req) {
    const userId = req.user.userId;
    const { bookmarkId, isBookmarked } = await this.bookmarkService.getBookmark(userId, placeId);
    return ResponseFormat.buildResponse({ bookmarkId, isBookmarked });
  }
}
