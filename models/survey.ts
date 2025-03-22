import mongoose, { Document, model, Schema, Types } from 'mongoose';
import Survey from '@/types/survey';

// Interface for the Survey document with Mongoose specific properties
export interface ISurvey extends Document, Omit<Survey, 'id' | 'responses'> {
	_id: Schema.Types.ObjectId;
	responses: Types.DocumentArray<Document>;
}

// Create the Schema
const SurveySchema = new Schema<ISurvey>(
	{
		title: { type: String, required: true },
		questions: { type: [String], required: true },
		responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }]
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
export default mongoose.models.Survey || model<ISurvey>('Survey', SurveySchema); 