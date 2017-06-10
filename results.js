
(function(){

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("turtleFacts")
        .controller("resultsCtrl", ResultsController);

    /*
     injecting the custom service quizMetrics into the results controller 
      using the $inject method.
    */
    ResultsController.$inject = ['quizMetrics', 'DataService'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function ResultsController(quizMetrics, DataService){
        var vm = this;

      
      
        vm.quizMetrics = quizMetrics; // binding the object from factory to vm 
        vm.dataService = DataService;
        vm.getAnswerClass = getAnswerClass; // named function defined below
        vm.setActiveQuestion = setActiveQuestion; // named function defined below
        vm.calculatePerc = calculatePerc; // named function defined below
        vm.activeQuestion = 0;

        function calculatePerc(){
            /*calculating the percentage of correct answers and returning the number*/
            
            return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
        }

        function setActiveQuestion(index){
            /*
             * setting active question on the results page
             */
            vm.activeQuestion = index;
        }

        function getAnswerClass(index){
        
            
            if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
                return "bg-success";
            }else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
                return "bg-danger";
            }
        }

    }

})();
