import { Game } from './game.js';
//CONSTANTS
const LOCATION = window.location.href;
const PATHNAME = window.location.pathname;
const QUESTIONS = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

class QuizzApp {
    $question;
    $choiceContainers;
    $choices;
    currentQuestion = {};
    acceptingAnswers = false;
    score = 0;
    questionCounter = 0;
    availableQuestions = [];
    game;
    $questionCounter;
    $score;


    constructor() {

    }

    init() {
        console.log("Init app");
        if(PATHNAME === '/game.html') {
            this.$question = document.getElementById("question");
            this.$choiceContainers = [...document.getElementsByClassName('choice-container')];
            this.$choices = [...document.getElementsByClassName("choice-text")];
            this.$questionCounter = document.getElementById("questionCounter");
            this.$score = document.getElementById("score");
            this.startGame();
            this.bindEvents();
        }
    }

    bindEvents() {
        this.$choiceContainers.forEach(choiceContainer => {
            choiceContainer.addEventListener('click', ev => {
                const $option = ev.currentTarget;
                console.log(ev.currentTarget.dataset);
                if (!this.acceptingAnswers) return;

                this.acceptingAnswers = false;

                const selectedChoice = ev.currentTarget;
                const selectedAnswer = selectedChoice.dataset['number'];

                console.log(+selectedAnswer === this.currentQuestion.answer);

                const classToApply = +selectedAnswer === this.currentQuestion.answer ? 'correct' : 'incorrect';

                if(classToApply === "correct") {
                    this.incrementScore(CORRECT_BONUS);
                }

                ev.currentTarget.classList.add(classToApply);
                setTimeout(() => {
                    $option.classList.remove(classToApply);
                    this.getNewQuestion();
                }, 1000);
            });
        })
    }

    startGame() {
        this.questionCounter = 0;
        this.score = 0;
        this.availableQuestions = [...QUESTIONS];
        this.getNewQuestion();
    }
  
    getNewQuestion() {
        if (this.availableQuestions.length === 0 || this.questionCounter > MAX_QUESTIONS) {
            // Go to the end page
            return window.location.assign('/end.html');

        }
        this.questionCounter++;

        this.$questionCounter.innerText = `${this.questionCounter} / ${MAX_QUESTIONS}`;

        const questionIndex = Math.floor(Math.random() * this.availableQuestions.length);
        this.currentQuestion = this.availableQuestions[questionIndex];
        this.$question.innerText = this.currentQuestion.question;

        this.$choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = this.currentQuestion[`choice${number}`];
        });

        //Splice questions to remove the used question
        this.availableQuestions.splice(questionIndex, 1);

        console.log(this.availableQuestions);

        this.acceptingAnswers = true;
    }

    incrementScore(num) {
        this.score = num;
        this.$score.innerText = this.score;
    }
  
}

const quizzApp = new QuizzApp();

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    quizzApp.init();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        quizzApp.init();
    });
}