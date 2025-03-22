import { prisma } from '@/lib/prisma';

type SurveyCreateInput = {
	title: string;
	questions: string[];
};

export async function getSurveyById(id: string) {
	return await prisma.survey.findUnique({
		where: { id },
		include: {
			responses: true,
		},
	});
}

export async function createSurvey(data: SurveyCreateInput) {
	return await prisma.survey.create({
		data: {
			title: data.title,
			questions: data.questions,
		},
	});
}
