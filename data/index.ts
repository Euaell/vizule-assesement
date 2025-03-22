'use server';

import * as prismaDataLayer from './prisma';

// Export all the database functions
export const {
	// Survey Operations
	getSurveyById,
	createSurvey,

	// Response Operations
	createResponse,
} = prismaDataLayer;

export async function addResponse(surveyId: string, answers: string[]) {
	return await createResponse({
		surveyId,
		answers
	});
}

export async function addSurvey(title: string, questions: string[]) {
	return await createSurvey({
		title,
		questions
	});
}

export async function fetchSurveyById(id: string) {
	return await prismaDataLayer.getSurveyById(id);
}
