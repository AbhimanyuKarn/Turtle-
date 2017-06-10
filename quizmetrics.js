
(function(){

    /*
     * creating a factory called quizMetrics and attaching that to the 
     * turtleFacts module. 
     * This factories job is to hold all the data the pertains to the quiz */
    angular
        .module("turtleFacts")
        .factory("quizMetrics", QuizMetrics);

        /*
         * dependency injection as seen in all the controllers. See comments 
         * there for a deeper explaination of dependency injection
         */
        QuizMetrics.$inject = ['DataService'];

        /*
         * function definition for the factory
         */
        function QuizMetrics(DataService){

            /*
             * quizObj is an object that will hold all of the above mentioned 
             * properties and methods and will be the return value of the 
             * factory
             *
             * As per pattern used in the controllers, the methods will 
             * reference named functions that are at the bottom of this function
             */
            var quizObj = {
                quizActive: false,
                resultsActive: false,
                changeState: changeState, // changeState is a named function below
                correctAnswers: [],
                markQuiz: markQuiz, // markQuiz is a named function below
                numCorrect: 0
            };

          
            return quizObj;

            function changeState(metric, state){
                if(metric === "quiz"){
                    quizObj.quizActive = state;
                }else if(metric === "results"){
                    quizObj.resultsActive = state;
                }else{
                    return false;
                }
            }

            /*
             * When called, the markQuiz method will loop through all the users
             * answers and compare them to the know correct answers to each
             * question. The total number of correct answers by the user is 
             * calculated and saved in the numCorrect property of the quizObj 
             * object
             */
            function markQuiz(){
                quizObj.correctAnswers = DataService.correctAnswers;
                for(var i = 0; i < DataService.quizQuestions.length; i++){
                    if(DataService.quizQuestions[i].selected === DataService.correctAnswers[i]){
                        DataService.quizQuestions[i].correct = true;
                        quizObj.numCorrect++;
                    }else{
                        DataService.quizQuestions[i].correct = false;
                    }
                }
            }

        }

})();
