'use server';

import { Survey as SurveyModel, Response as ResponseModel } from '@/lib/db';
import dbConnect from '@/lib/mongoose';
import mongoose from 'mongoose';
import { Survey, Response } from '@/types';


export async function addResponse(surveyId: string, answers: string[]): Promise<Response> {
	try {
		await dbConnect();
		
		// Validate surveyId
		if (!mongoose.Types.ObjectId.isValid(surveyId)) {
			throw new Error('Invalid survey ID');
		}
		
		// Check if survey exists
		const survey = await SurveyModel.findById(surveyId);
		if (!survey) {
			throw new Error('Survey not found');
		}
		
		// Verify answers match questions count
		if (answers.length !== survey.questions.length) {
			throw new Error('Number of answers must match number of questions');
		}
		
		// Create response
		const response = await ResponseModel.create({
			answers,
			surveyId
		});
		
		// Add reference to survey
		await SurveyModel.findByIdAndUpdate(
			surveyId,
			{ $push: { responses: response._id } }
		);
		
		return response;
	} catch (error) {
		console.error('Error adding response:', error);
		throw error;
	}
}

export async function addSurvey(title: string, questions: string[]): Promise<Survey> {
	try {
		await dbConnect();
		
		if (!title || !questions || questions.length === 0) {
			throw new Error('Title and at least one question are required');
		}
		
		const survey = await SurveyModel.create({
			title,
			questions
		});
		
		return survey;
	} catch (error) {
		console.error('Error adding survey:', error);
		throw error;
	}
}

export async function fetchSurveyById(id: string): Promise<Survey> {
	try {
		await dbConnect();
		
		// Validate ID
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new Error('Invalid survey ID');
		}
		
		// Find survey and populate responses
		const survey = await SurveyModel.findById(id)
			.populate({
				path: 'responses',
				model: ResponseModel
			});
		
		if (!survey) {
			throw new Error('Survey not found');
		}
		
		return survey;
	} catch (error) {
		console.error('Error fetching survey:', error);
		throw error;
	}
}

export async function fetchAllSurveys() {
	try {
		await dbConnect();
		
		const surveys = await SurveyModel.find({})
			.sort({ createdAt: -1 });
		
		return surveys;
	} catch (error) {
		console.error('Error fetching surveys:', error);
		throw error;
	}
}
