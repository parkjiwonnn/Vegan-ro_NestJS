import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type ReviewDocument = ReviewSchema & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class ReviewSchema {
  @Prop({
    type: Types.ObjectId,
    ref: 'Place',
    required: true,
  })
  place_id: Types.ObjectId;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: Types.ObjectId;
}

const schema = SchemaFactory.createForClass(ReviewSchema);
schema.plugin(mongoosePaginate);

export const reviewSchema = schema;
