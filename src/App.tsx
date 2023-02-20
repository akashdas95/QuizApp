import React, { useState } from "react";
import { difficulty, fetchQuizQuestion, QuestionState } from "./APi";
import { GlobalStyle, Wrapper } from "./App.styles";
import QuestionCard from "./components/Question";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Total_Questions: number = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [correctAns, setCorrectAns] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setCorrectAns(true);

    const newQuestions = await fetchQuizQuestion(
      Total_Questions,
      difficulty.HARD
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      } else {
        setCorrectAns(false);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    setCorrectAns(true);

    if (nextQuestion === Total_Questions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Kuan banega crorepati (2022 edition)</h1>
        {gameOver || userAnswer.length === Total_Questions ? (
          <button className="start" onClick={startQuiz}>
            start
          </button>
        ) : null}
        {!gameOver ? <p className="score">your Score:{score}</p> : null}
        {loading ? <p>Loading Question...</p> : null}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={Total_Questions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!correctAns ? (
          <p className="right_ans">
            right answer :
            <span
              dangerouslySetInnerHTML={{
                __html: questions[number].correct_answer,
              }}
            />
          </p>
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswer.length === number + 1 &&
        number !== Total_Questions - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
