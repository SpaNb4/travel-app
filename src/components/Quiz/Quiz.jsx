import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import './Quiz.scss';

import { useTranslation } from 'react-i18next';

import { getPlaces } from '../../store/country/slices';
import { createQuestions, buildUrl } from '../../common/helpers';
import { InternalUrls } from '../../common/constants';

const Quiz = () => {
  const [t] = useTranslation();
	const places = useSelector(getPlaces);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

  useEffect(() => {
    if (!questions) {
      setQuestions(createQuestions(places))
    }    
  }, [places, questions])

	const handleAnswerClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}
    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

  const imageUrl = questions && questions[currentQuestion].answerOptions.find((option) => option.isCorrect).image;

  const answerButtons = questions && questions[currentQuestion].answerOptions.map((answerOption, index) => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleAnswerClick(answerOption.isCorrect)}
      key={answerOption.answer + index}
    >
      {answerOption.answer}
    </Button>
  ))

	return (
		<div className="quiz">
			{
        showScore && (
          <h2 className="score">
            {`${t('You scored')} ${score} ${t('out of')} ${questions.length}`}
          </h2>
        )
      }
      {
        !showScore && questions && (
          <React.Fragment>
            <div className="questions">
              <h3 className="questions-count">
                <span>{`${t('Question')} ${currentQuestion + 1}`}</span>/{questions.length}
              </h3>
              <h3 className="question">{t('What is the name of this place?')}</h3>
              <div className="question-image">
                <img src={buildUrl(InternalUrls.Image, imageUrl)} alt="place image" />
              </div>
            </div>
            <div className="answers">
              {answerButtons}
            </div>
          </React.Fragment>
        )
      }
		</div>
	);
}

export default Quiz;
