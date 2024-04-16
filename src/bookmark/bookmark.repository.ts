import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookmarkDocument} from "./bookmark.schema";
import { Model } from 'mongoose';

@Injectable()
export class BookmarkRepository {
    constructor(@InjectModel('Bookmark') private readonly bookmarkModel: Model<BookmarkDocument>) {}

    async getBookmarksByUserId(userId: string, pageNumber: number, pageSize: number) {
      return this.bookmarkModel
        .find({ user_id: userId })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .populate({
          path: 'place_id',
          populate: {
            path: 'category_img',
            model: 'Image',
          },
        })
        .exec();
    }
  }