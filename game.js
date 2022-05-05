export class Game {
    constructor(questions) {
      // this es una variable para referenciar el valor del contexto local de esta clase
      this.questions = questions; // Estás variables se le conocen como atributos
    }
  
    // método
    // this.name es la variable que se guarda en el contexto local
    // message es una variable que se le pasa al ejecutar este método
    startGame(questionCounter, score, availableQuestions) {
      //console.log(`[Objeto con nombre: ${this.name}] info: ${message}`);
      questionCounter = 0;
      score = 0;
      availableQuestions = [...this.questions];
      console.log(availableQuestions);
      this.getNewQuestion();
    }

    getNewQuestion() {
        console.warn("getNewQuestion Method");
    }

}