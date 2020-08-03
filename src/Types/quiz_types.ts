import React, { SetStateAction } from 'react'

export type QuizType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionType = {
    category: string
    question: string 
    options: string[]
    correct_answer: string
}

export type CategoryType = {
    id: number;
    name: string;
  };

export type PropsType = {
    question: string
    options: string[]
    callback: (e:React.FormEvent<EventTarget>, ans:string, remainingQuestions:number ,
    setRemainingQuestions: React.Dispatch<SetStateAction<number>> ) => void
    setShowResult: React.Dispatch<SetStateAction<boolean>>
    totalQuestions: number
    category: string
}