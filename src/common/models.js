export class AnswerOption {
	constructor(answer, image = '') {
		this.answer = answer;
		this.image = image;
		this.isCorrect = !!image;
	}
}

export class Question {
	constructor(answerOptions) {
		this.answerOptions = [...answerOptions];
	}
}
