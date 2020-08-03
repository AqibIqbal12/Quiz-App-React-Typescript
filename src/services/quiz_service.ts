import { QuestionType, QuizType, CategoryType } from './../Types/quiz_types';

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

export const getQuizDetails = async (totalQuestions: number,category:number, level: string): Promise<QuestionType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${level}&type=multiple`);
    let { results } = await res.json();
    //console.log(results)
    const quiz: QuestionType[] = results.map((questionObj: QuizType) => {
        return {

            category: questionObj.category,
            question: questionObj.question,
            options: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer)),
            correct_answer: questionObj.correct_answer
    
        }
    })
    return quiz;
}

export const getCategory = async (): Promise<CategoryType[]> => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const { trivia_categories } = await res.json();
    const category: CategoryType[] = trivia_categories.filter((cat: CategoryType)=>{
        return (cat.id === 9 || cat.id === 21 || cat.id === 23)
    })
    return category;
  };
  