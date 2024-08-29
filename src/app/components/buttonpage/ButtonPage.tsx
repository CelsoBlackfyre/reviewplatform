import React from "react";

export default function ButtonPage(props: any) {
	const { currentPage, totalPages, setCurrentPage } = props;

	return (
		<div className="inline-flex text-center align-middle items-center space-x-2">
			{currentPage > 1 && (
				<button
					className="bg-black hover:bg-red-700 text-amber-400 font-bold py-2 px-4 rounded-l"
					onClick={() => setCurrentPage(currentPage - 1)}>
					Prev
				</button>
			)}
			<span className="flex items-center px-4 py-2 text-red-700">
				Page {currentPage} of {totalPages}
			</span>
			{currentPage < totalPages && (
				<button
					className="bg-black hover:bg-red-700 text-amber-400 font-bold py-2 px-4 rounded-r"
					onClick={() => setCurrentPage(currentPage + 1)}>
					Next
				</button>
			)}
		</div>
	);
}
