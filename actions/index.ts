"use server";

import { FormState } from "@/helper/FormErrorHandler";
import { createSurvey as createSurveyDB } from "@/data";
import { GenerationConfig, GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
	throw new Error("Missing API key for question generation");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash-lite",
	systemInstruction: "For user provided title give me the question to test knowledge",
});

// Use the model's generation config options
const generationConfig: GenerationConfig = {
	temperature: 1.8,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
	responseSchema: {
		type: SchemaType.OBJECT,
		properties: {
			questions: {
				type: SchemaType.ARRAY,
				items: {
					type: SchemaType.STRING
				}
			}
		},
		required: [
			"questions"
		]
	},
};

export async function createSurvey(formState: FormState, formData: FormData): Promise<FormState> {
	const title = formData.get("title");
	const numberOfQuestions = formData.get("numberOfQuestions");
	const difficulty = formData.get("difficulty");
	console.debug(title, numberOfQuestions, difficulty);
	if (!title) {
		return { ...formState, status: "ERROR", fieldErrors: { title: ["Title is required"] } };
	}

	try {
		const chatSession = model.startChat({
			generationConfig,
			history: [],
		});

		// Generate questions based on the title
		const prompt = `Generate ${numberOfQuestions || 10} questions about: ${title.toString()}. Difficulty: ${difficulty}.
					   Return response as JSON with a questions array.`;
		const result = await chatSession.sendMessage(prompt);
		const responseText = result.response.text();

		// Extract the JSON from the response
		let responseData;
		try {
			responseData = JSON.parse(responseText);
		} catch {
			// If the response isn't valid JSON, try to extract it
			const jsonMatch = responseText.match(/\{[\s\S]*\}/);
			if (jsonMatch) {
				responseData = JSON.parse(jsonMatch[0]);
			} else {
				throw new Error("Could not parse response as JSON");
			}
		}

		if (!responseData.questions || !Array.isArray(responseData.questions)) {
			throw new Error("Invalid response format from AI model");
		}

		// Create survey with generated questions - omitting id and createdAt as those will be set by the database
		const surveyData = {
			title: title.toString(),
			questions: responseData.questions,
			responses: []
		};

		// Call the database function to create the survey
		const survey = await createSurveyDB(surveyData);

		return { 
			...formState, 
			status: "SUCCESS", 
			fieldValues: { 
				title, 
				numberOfQuestions,
				difficulty,
				surveyId: survey.id,
				questions: responseData.questions
			} 
		};
	} catch (error) {
		console.error("Error generating questions:", error);
		return { 
			...formState, 
			status: "ERROR", 
			fieldErrors: { form: ["Failed to generate questions. Please try again."] } 
		};
	}
}
