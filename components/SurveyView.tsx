"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Survey } from "@/types";

export default function SurveyView({ survey }: { survey: Survey }) {
	const router = useRouter();
	const [answers, setAnswers] = useState<string[]>(new Array(survey.questions.length).fill(""));
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);

	const handleAnswerChange = (index: number, value: string) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		setError(null);

		// Validate inputs - ensure no empty answers
		if (answers.some(answer => answer.trim() === "")) {
			setError("Please answer all questions");
			setSubmitting(false);
			return;
		}

		await fetch("/api/survey", {
			method: "POST",
			body: JSON.stringify({ surveyId: survey.id, answers }),
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setSubmitted(true);
			// Refresh data after submission
			// router.refresh();
		})
		.catch(err => {
			console.error(err);
			setError(err instanceof Error ? err.message : "Failed to submit response");
		})
		.finally(() => {
			setSubmitting(false);
		});
	};

	if (submitted) {
		return (
			<div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
				<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-600">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
				<p className="text-gray-600 mb-6">Your response has been submitted successfully.</p>
				<button
					onClick={() => router.push("/")}
					className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
				>
					Back to Home
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg shadow-gray-500 overflow-y-auto">
			<div className="bg-gradient-to-r from-cyan-800 to-emerald-600 p-6">
				<h1 className="text-2xl font-bold text-white md:text-3xl">{survey.title}</h1>
				<p className="text-gray-200 mt-2">Please answer all questions below</p>
			</div>

			{error && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			)}

			<form onSubmit={handleSubmit} className="p-6">
				<div className="flex flex-col max-h-[500px] gap-4 overflow-y-auto min-h-[300px]">
					{survey.questions.map((question, index) => (
						<div key={index} className="bg-gray-50 p-5 rounded-lg text-black">
							<label className="block font-medium text-gray-700 mb-3">
								<span className="text-lg font-bold text-cyan-800">Q{index + 1}:</span> {question}
							</label>
							<textarea
								value={answers[index]}
								onChange={(e) => handleAnswerChange(index, e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-md outline-emerald-600 transition-colors"
								rows={3}
								placeholder="Type your answer here..."
							/>
						</div>
					))}
				</div>

				<div className="mt-8 flex justify-end">
					<button
						type="submit"
						disabled={submitting}
						className={`px-6 py-3 bg-emerald-700 cursor-pointer text-white rounded-md font-medium hover:bg-emerald-800 transition-colors ${
							submitting ? "opacity-70 cursor-not-allowed" : ""
						}`}
					>
						{submitting ? (
							<>
								<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Submitting...
							</>
						) : (
							"Submit Response"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
