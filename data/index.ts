'use server';

import Survey from "@/types/survey";

export async function getSurveyById(id: string): Promise<Survey> {
    throw new Error("Not implemented");
}

export async function createSurvey(survey: Omit<Survey, "id" | "createdAt">): Promise<Survey> {

    // throw new Error("Not implemented");
    return {
        id: "1",
        createdAt: new Date(),
        title: survey.title,
        questions: survey.questions,
        responses: survey.responses
    }
}

export async function addResponse(surveyId: string, response: Response): Promise<Response> {
    throw new Error("Not implemented");
}
