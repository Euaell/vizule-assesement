"use client";

import { createSurvey } from "@/actions";
import Loading from "@/components/Loading";
import { EMPTY_FORM_STATE } from "@/helper/FormErrorHandler";
import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
	const [formState, formAction, isLoading] = useActionState(createSurvey, EMPTY_FORM_STATE);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	useEffect(() => {
		if (formState.status === "SUCCESS") {
			redirect(`/survey/${formState.fieldValues?.surveyId}`);
		}
	}, [formState]);

	return (
		<div className="w-full h-screen flex items-center justify-center">
			{isLoading ? <Loading /> :
				<div className="w-1/2 min-w-[300px] max-w-[600px] h-fit bg-white text-black rounded-lg p-4 gap-4 flex flex-col">
					<h1 className="text-4xl font-bold">Generate Survey</h1>
					<form className="flex flex-col gap-2" action={formAction}>
						<div className="">
							<input
								type="text"
								id="title"
								name="title"
								defaultValue={formState.fieldValues?.title?.toString()}
								placeholder="Title"
								className="w-full p-2 rounded-md border-2 border-gray-300 outline-gray-400"
								required
							/>
						</div>
						<div className="flex flex-row justify-end gap-2">
							<button
								type="button"
								className="cursor-pointer text-cyan-700"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								<span className="flex flex-row items-center gap-2">
									{/* Dropdown icon, rotate 180 degrees if dropdown is open */}
									<svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-100 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
									Advanced Options
								</span>
							</button>
							<button
								type="submit"
								disabled={isLoading}
								className={`bg-green-700 cursor-pointer min-w-1/3 text-white p-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								Generate
							</button>
						</div>

						{dropdownOpen && (
							<div className="flex flex-col gap-1 bg-gray-100 p-2 rounded-md duration-300">
								<div className="flex flex-row gap-2 items-center">
									<label htmlFor="numberOfQuestions">Number of Questions: </label>
									<input
										type="number"
										id="numberOfQuestions"
										name="numberOfQuestions"
										className="border-2 border-gray-300 rounded-md outline-gray-400 py-1 px-3 max-w-[100px]"
										max={15}
										min={1}
										defaultValue={formState.fieldValues?.numberOfQuestions?.toString()}
									/>
								</div>

								<div className="flex flex-row gap-2 items-center">
									<label htmlFor="difficulty">Difficulty: </label>
									<select
										id="difficulty"
										name="difficulty"
										className="border-2 border-gray-300 rounded-md outline-gray-400 py-1 px-3 max-w-[100px] min-w-fit"
										defaultValue={formState.fieldValues?.difficulty?.toString()}
									>
										<option value="easy">Easy</option>
										<option value="medium">Medium</option>
										<option value="hard">Hard</option>
									</select>
								</div>
							</div>
						)}
					</form>
				</div>
			}
		</div>
	);
}
