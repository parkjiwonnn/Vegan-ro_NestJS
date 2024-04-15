import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose";


// 새로운 우리만의 타입 -User 스키마 문서 타입 /
export type UserDocument = UserScema & Document;

@Schema({
  collection: 'User',
  timestamps:{createdAt: 'created_at',
  updatedAt: 'updated_at',},
  versionKey: false,
})
export class UserScema {
    @Prop({required: false,})
    email:string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    nickname: string;

    @Prop()
    phone: string;

    @Prop()
    tag: string;

    @Prop({
      type: Types.ObjectId,
      ref: 'Image',
    })
    tag_img: Types.ObjectId //|ImageDocument;

    @Prop()
    complaint: number;

    @Prop()
    is_admin:boolean;

    @Prop()
    deleted_at:Date;
  }

const Schema = SchemaFactory.createForClass(UserScema);
Schema.plugin(mongoosePaginate)
