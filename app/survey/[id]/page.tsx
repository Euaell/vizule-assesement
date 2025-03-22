import { fetchSurveyById } from "@/data";
import SurveyView from "@/components/SurveyView";
import { Survey } from "@/types";
import { notFound } from "next/navigation";

interface PageProp {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProp) {
	const { id } = await params;
	let survey: Survey;
	try {
		survey = await fetchSurveyById(id);
	} catch (error) {
		console.error('Error fetching survey:', error);
		notFound();
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<SurveyView survey={survey} />
		</div>
	);
}
