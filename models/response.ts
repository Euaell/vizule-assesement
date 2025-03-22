import mongoose, { Document, model, Schema } from 'mongoose';
import Response from '@/types/response';

// Interface for the Response document with Mongoose specific properties
export interface IResponse extends Document, Omit<Response, 'id'> {
  _id: Schema.Types.ObjectId;
  surveyId: Schema.Types.ObjectId;
}

// Create the Schema
export const ResponseSchema = new Schema<IResponse>(
  {
    answers: { type: [String], required: true },
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true }
  },
  { 
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Only create the model if it doesn't already exist to prevent overrides during hot reloads
export default mongoose.models.Response || model<IResponse>('Response', ResponseSchema); 