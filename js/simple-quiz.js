//variables to fetch elements from my HTML 
let quizContainer = document.getElementById('quiz'); 
let resultsContainer = document.getElementById('results');
let submitButton = document.getElementById('submit');

//Questions and options to display in my HTML
let myQuestions = [ 
	{
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
	{
		question: "What is 30/3?",
		answers: {
			a: '3',
			b: '5',
			c: '10'
		},
		correctAnswer: 'c'
	}
];


function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
        // the empty brackets allow me to store the chosen answer
        let output = [];
        let answers;
    
        // it will iterate through each question
        for(let i=0; i<questions.length; i++){
            
            answers = []; // list of answers from the first question to the last one
    
            // riterates answers
            for(letter in questions[i].answers){
    
            // add radios to each option
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }
    
// Push add an item, displays each question with the chosen answer
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
    
//"join" joins the results to display them in the HTML
        quizContainer.innerHTML = output.join('');
    }

	function showResults(questions, quizContainer, resultsContainer){
	
//Query selector finds all nodes matching answers
        let answerContainers = quizContainer.querySelectorAll('.answers'); 
        
        // keep track of user's answers
        let userAnswer = '';
        let numCorrect = 0;
        
        // for each question...
        for(let i=0; i<questions.length; i++){
    
            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'green';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }
    
        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);