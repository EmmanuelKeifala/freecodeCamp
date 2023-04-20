/** @format */

import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaTwitterSquare } from "react-icons/fa";
function Quotes() {
	const [quotes, setQuotes] = useState([]);
	const [nextQuoteNumber, setNextQuoteNumber] = useState(0);
	const [color, setColor] = useState("blue");
	useEffect(() => {
		fetch("https://type.fit/api/quotes")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				setQuotes(data);
			});
	}, []);
	const nextQuote = () => {
		let x = Math.floor(Math.random() * 1000);
		setNextQuoteNumber(x);

		const colors = [];
		for (let i = 0; i < 10; i++) {
			const color = "#" + Math.floor(Math.random() * 16777215).toString(16); // Generates a random RGB color in hexadecimal format
			colors.push(color);
			setColor(color);
		}
	};
	return (
		<main
			id=""
			style={{ backgroundColor: color }}
			className={`flex justify-center gap-10 h-screen place-items-center bg-[]`}>
			<div
				id="quote-box"
				className=" bg-white w-[50%] h-[30%] flex flex-col justify-center text-center font-medium from-neutral-700">
				<div className="flex flex-row justify-around">
					<div
						id="text"
						className=" text-3xl font-serif flex flex-row"
						style={{ color: color }}>
						<p className="m-2">
							<FaQuoteLeft size={20} />
						</p>
						<p>{quotes[nextQuoteNumber]?.text}</p>
					</div>
				</div>

				<div className="flex flex-col justify-around items-end mr-20">
					<p id="author" style={{ color: color }}>
						{" "}
						~ {quotes[nextQuoteNumber]?.author}
					</p>
				</div>
				<div className="flex flex-row justify-around mt-5">
					<a href="twitter.com/intent/tweet" id="tweet-quote">
						<FaTwitterSquare size={50} color={color} />
					</a>
					<button
						style={{ color: "white", backgroundColor: color }}
						onClick={nextQuote}
						id="new-quote"
						type="button"
						className="rounded-md p-2">
						New Quote
					</button>
				</div>
			</div>
		</main>
	);
}

export default Quotes;
