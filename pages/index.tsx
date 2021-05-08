export default function HomePage(): JSX.Element {
	return (
		<div>
			<h1 className="text-center text-3xl my-4">Colors</h1>
			<div className="grid grid-cols-7 gap-4 p-4">
				<div className="h-8 w-8 mx-auto bg-blue-100"></div>
				<div className="h-8 w-8 mx-auto bg-blue-200"></div>
				<div className="h-8 w-8 mx-auto bg-blue-300"></div>
				<div className="h-8 w-8 mx-auto bg-blue-400"></div>
				<div className="h-8 w-8 mx-auto bg-blue-500"></div>
				<div className="h-8 w-8 mx-auto bg-blue-600"></div>
				<div className="h-8 w-8 mx-auto bg-blue-700"></div>
				<div className="h-8 w-8 mx-auto bg-gray-100"></div>
				<div className="h-8 w-8 mx-auto bg-gray-200"></div>
				<div className="h-8 w-8 mx-auto bg-gray-300"></div>
				<div className="h-8 w-8 mx-auto bg-gray-400"></div>
				<div className="h-8 w-8 mx-auto bg-gray-500"></div>
				<div className="h-8 w-8 mx-auto bg-gray-600"></div>
				<div className="h-8 w-8 mx-auto bg-gray-700"></div>
			</div>
		</div>
	);
}
