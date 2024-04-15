import { Module } from "@nestjs/common";
import { BookmarkController } from "./bookmark.controller";
import { BookmarkRepository } from "./bookmark.repository";
import { BookmarkService } from "./bookmark.service";


@Module({
    imports: [] ,
    controllers: [BookmarkController, BookmarkRepository],
    providers: [BookmarkService],
    
})
export class BookmarkModule {}