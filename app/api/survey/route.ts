import { addResponse } from "@/data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { surveyId, answers } = await req.json();
	const response = await addResponse(surveyId, answers);
	return NextResponse.json(response);
}


