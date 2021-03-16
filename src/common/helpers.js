import { NUMBER_OF_OPTIONS } from './constants';
import { Question, AnswerOption } from './models';
import remove from 'lodash/remove';
import shuffle from 'lodash/shuffle';
import random from 'lodash/random';

export function buildUrl(...args) {
	return args.join('');
}

function getIncorrectAnswerOptions(places, answerOptions) {
	let restPlaces = [...places];
	for (let i = 0; i < answerOptions.length; i += 1) {
		restPlaces = remove(restPlaces, function (place) {
			return place.name !== answerOptions[i].answer;
		});
	}
	return restPlaces;
}

export const createQuestions = (places) => {
	const questions = places.map((place) => new Question([new AnswerOption(place.name, place.imageUrl)]));

	return questions.map((question) => {
		const { answerOptions } = question;
		for (let i = 1; i < NUMBER_OF_OPTIONS; i += 1) {
			const incorrectPlaces = getIncorrectAnswerOptions(places, answerOptions);
			const incorrectPlace = incorrectPlaces[random(incorrectPlaces.length - 1)];
			answerOptions.push(new AnswerOption(incorrectPlace.name));
		}
		return new Question(shuffle(answerOptions));
	});
};
