import { v4 as uuidv4 } from 'uuid';

/**
 * Returns mutated object, where all nested objects have a unique id
 * @param {data} data - An object with nested objects
 */
export const extendWithIds = (data) =>
	Object.fromEntries(
		Object.entries(data).map(([key, value]) => [
			key,
			{
				...value,
				id: uuidv4(),
			},
		])
	);

const NUMBER_OF_OPTIONS = 4;

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function shuffleArray(array) {
	const copy = [...array];
	for (let i = 0; i < copy.length; i += 1) {
		const j = Math.floor(Math.random() * copy.length);
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

/**
 * Returns an array of objects:
 * {
 * 	answerOptions: [
 *			{ answer: 'New York', isCorrect: false },
 * 		{ answer: 'London', isCorrect: false },
 * 		{ answer: 'Paris', isCorrect: true },
 * 		{ answer: 'Dublin', isCorrect: false },
 *		],
 * }
 */
export const createQuestions = (places) => {
	const questionsWithCorrectAnswer = places.map((place) => ({
		answerOptions: [{ answer: place.name, isCorrect: true, imgUrl: place.imageUrl }],
	}));
	const questions = questionsWithCorrectAnswer.map((quiz) => {
		const finalQuiz = { ...quiz };
		for (let i = finalQuiz.answerOptions.length; i < NUMBER_OF_OPTIONS; i += 1) {
			const incorrectPlaces = places.filter((place) => {
				for (let i = 0; i < finalQuiz.answerOptions.length; i += 1) {
					return place.name !== finalQuiz.answerOptions[i].answer;
				}
			});
			const incorrectPlace = incorrectPlaces[getRandomInt(incorrectPlaces.length)];
			finalQuiz.answerOptions.push({ answer: incorrectPlace.name, isCorrect: false });
		}
		return { answerOptions: shuffleArray(finalQuiz.answerOptions) };
	});
	return questions;
};
