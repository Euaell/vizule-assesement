import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-1/2 min-w-[300px] max-w-[600px] h-fit bg-white text-black rounded-lg p-8 gap-6 flex flex-col items-center text-center">
				<div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
				
				<h1 className="text-4xl font-bold">Page Not Found</h1>
				
				<p className="text-gray-600">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				
				<Link 
					href="/"
					className="bg-green-700 cursor-pointer text-white p-3 rounded-md hover:bg-green-800 transition-colors flex items-center"
				>
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						className="h-5 w-5 mr-2" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
					>
						<path 
							strokeLinecap="round" 
							strokeLinejoin="round" 
							strokeWidth={2} 
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
						/>
					</svg>
					Return to Home
				</Link>
			</div>
		</div>
	);
} 