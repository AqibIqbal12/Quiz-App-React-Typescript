import React, { useState, useEffect, SetStateAction } from 'react';
import { getQuizDetails, getCategory } from '../services/quiz_service';
import { CategoryType, QuestionType } from '../Types/quiz_types';
import Card from './Card';

export const Home = () => {
  const [selectedCategory, setselectedCategory] = useState(0);
  let [categories, setCategories] = useState<CategoryType[]>([]);
  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStart, setQuizStart] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {

    const fetchCategory = async () => {
      const cat: CategoryType[] = await getCategory();
      setCategories(cat);
    };
    fetchCategory();

    const fetchQuizData = async () => {
        const questions: QuestionType[] = await getQuizDetails(5, selectedCategory, 'easy');
        //console.log(questions)
        setQuiz(questions)
    }
    if(quizStart){
      fetchQuizData();
    }
    
  }, [selectedCategory, quizStart]);

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(typeof e.target.value)
    setselectedCategory(parseInt(e.target.value))
    setShowMsg(false)
  }

  const handleStartBtn = async() => {
    if (selectedCategory === 0) {
      setShowMsg(true)
      setQuizStart(false)

    }
    else {
      setQuizStart(true);
      // const questions: QuestionType[] = await getQuizDetails(5, selectedCategory, 'easy');
      // console.log(questions)
      // setQuiz(questions)
    }
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string, remainingQuestions: number, setRemainingQuestions: React.Dispatch<SetStateAction<number>>) => {

    e.preventDefault();
    const currentQuestion: QuestionType = quiz[currentIndex];
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (currentIndex !== quiz.length - 1) {
      setCurrentIndex(++currentIndex);
      setRemainingQuestions(--remainingQuestions);
    }
    else {
      setShowResult(true);
    }
  }

  const handleStartAgain = ()=>{
    setShowResult(false);
    setQuizStart(false);
    setselectedCategory(0);
    setCategories([]);
    setCurrentIndex(0);
    setQuiz([]);
    setScore(0);
  }
  
  if (showResult) {
    return (
    <div className="home_container result_container">
      <h1>Result</h1>
      <p className="result_text">
        You scored
          <b> {score}</b> out of <b>{quiz.length}</b>
      </p>
      <button onClick={handleStartAgain}>Start Again</button>
    </div>
    )
  }

  
  if (quizStart) {
    if (!quiz.length){ 
      return (
      <div className="home_container loadingImgConatiner">
        <img src={process.env.PUBLIC_URL + "loading.gif"} alt=""/> 
      </div>
        )
    }

    return (
      <Card question={quiz[currentIndex].question} options={quiz[currentIndex].options} callback={handleSubmit} setShowResult={setShowResult} totalQuestions={quiz.length} category={quiz[currentIndex].category} />
    )
  }
  else {
    return (

      <div className="home_container">
        {
         !categories.length ? <> 
         <div className="loadingImgConatiner"><img src={process.env.PUBLIC_URL + "loading.gif"} alt=""/></div>
         </>
         :<>
        <div className="btn_container">
          <button onClick={handleStartBtn}>Start Quiz</button>
        </div>
        <div>
        {
          showMsg &&
          <h3 style={{ textAlign: 'center', color: "red" }} className="msg">Select Category</h3>
        }
        </div>
        <div className="list_container">
          <select onChange={handleSelectCategory} defaultValue="Select">
            <option value={0}>--Select Category--</option>
            {
              categories.map((cat) => {

                  return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
              })
            }
            {/* <option value="General_Knowledge">General Knowledge</option>
                        <option value="History">History</option>
                        <option value="Sports">Sports</option> */}
          </select>
        </div>
        </>
      }
      </div>
    )
  }

}
