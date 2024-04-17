import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { ResponseFormat } from "src/errors/response.format";

@Controller('bookmarks')
export class BookmarkController {
}