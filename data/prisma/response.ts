import { prisma } from '@/lib/prisma';

type ResponseData = {
  surveyId: string;
  answers: string[];
};

export async function createResponse(data: ResponseData) {
  return await prisma.response.create({
    data: {
      surveyId: data.surveyId,
      answers: data.answers,
    },
  });
}
