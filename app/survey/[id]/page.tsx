import { getSurveyById } from "@/data";

interface PageProp {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: PageProp) {
	const { id } = await params
	const survey = await getSurveyById(id)

	return (
		<div>
			<span>id: {id}</span>
			<span>survey: {JSON.stringify(survey)}</span>
		</div>
	)
}
