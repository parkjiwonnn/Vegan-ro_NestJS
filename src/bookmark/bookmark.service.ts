import { Injectable } from "@nestjs/common";
import { BookmarkRepository } from "./bookmark.repository";

@Injectable()
export class BookmarkService {
    constructor(private readonly bookmarkRepository: BookmarkRepository) {}

    async getBookmarksByUserId(userId: string, pageNumber: number, pageSize: number) {
      return this.bookmarkRepository.getBookmarksByUserId(userId, pageNumber, pageSize);
    }
  }
