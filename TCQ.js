const GREKey = 'f6bf5906c1msh45ccd6bea4e4595p19e710jsn64d68bc7e7d2';
const GRESearchURL = 'https://gre-verbal.p.rapidapi.com';
let QuizData

const OwlBotKey = '9faa238a2ea15e95757bb04c25875855ffbb8f94';
const OwlBotSearchURL = 'https://owlbot.info/api/v4/dictionary/';


//welcome page
function welcomePage() {
  console.log("welcome page running")
  $('main').html(
    `
      <section>
        <h1>GRE Verbal Questions Practice</h1>
        <br>
        <div>
          <h3>Thank you so much for choosing us! Let's go practicing GRE verbal questions.</h3>
        </div>
        <div id='readyGoButton'>
          <button class='readyGo' type='button'>
            <span>Ready? GO!</span>
          </button>
        </div>
      </section>
      <footer>
        <hr>
        <section class="contactForm">
          <h5>Contact for Tech Support</h5>
            
            <form action="https://formspree.io/xgenbrgo" method="POST" enctype="multipart/form-data">
              <label for="user-name">Name:</label>
              <input id="user-name" type="text" name="name" required><br>

              <label for="user-email">Email:</label>
              <input id="user-email" type="text" name="email" required><br>

              <label for="user-message">Message:</label>
              <textarea id="user-message" name="message" required></textarea><br>

              <button id='ContactFormButton' type="submit">Submit</button>
            </form>
                
        </section>
      </footer>
    `
  )
}

//let the user choose a question type out of 2
function showQuestionTypes() {
  $('main').on('click', '.readyGo', function () {
    console.log("display questions type choice");
    displayQuestionTypes();
  })
}

//pairing with the function above to display the 2 question types
function displayQuestionTypes() {
  $('main').html(
    `
    <section class="questionTypes">
      <div>
        <h3>Text Completion Questions</h3>
        <p>Text completion questions omitted crucial words from short passages and ask the test taker to use the remaining information in the passage as a basis for selecting words or short phrases to fill the blanks and create a coherent, meaningful whole.</p>
        <button class='TCQButton' type='button'>
        <span>I choose Text Completion Questions</span>
        </button>
      </div>

      <hr>

      <div>
        <h3>Sentence Equivalence Questions</h3>
        <p>Sentence Equivalence questions consist of a single sentence with just one blank, and you will be asked to find two choices that lead to a complete, coherent sentence while producing sentences that mean the same thing.</p>
        <button class='SEQButton' type='button'>
        <span>I choose Sentence Equivalence Questions</span>
        </button>
      </div>
    </section>
    `
  )
}

//when user choose Text Completion question
function TCQButton() {
  $('main').on('click', '.TCQButton', function () {
    console.log('displaying TCQ questions');
    fetchTCQquestions();
  });
}

//fetching tc questions
function fetchTCQquestions() {
  fetch("https://gre-verbal.p.rapidapi.com/api/v1/questions?subcat=TC&count=10", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "gre-verbal.p.rapidapi.com",
      "x-rapidapi-key": "f6bf5906c1msh45ccd6bea4e4595p19e710jsn64d68bc7e7d2"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      QuizData = data.data[0];
      displayTCQquestions(data)
    })
}

//display tc questions
function displayTCQquestions(data) {
  $('main').html(
    `
    <h3>Text Completion Questions</h3>
    <form id='subTCQ'>
    <h4>${addDropDown(data.data[0].description, data.data[0].options)}</h4>
     <button class='turnIn' type='submit'>Turn in</button>
    </form>
     `
  )
}

//the drop down select function
function addDropDown(desc, options) {
  let question = desc.split('__________')
  let option = ''
  for (let i = 0; i < options.length; i++) {
    option += `${question[i]}`
    option += `<select id='TCQanswer${i}'>`
    for (let j = 0; j < options[i].length; j++) {
      option += `<option value="${j}">${options[i][j]}</option>`
    }
    option += `</select>`
    if (i === options.length - 1) {
      option += `${question[i + 1]}`
    }
  }
  return option
}

//event handler for submit answer for TCQ
function submitTCQanswer() {
  $('main').on('submit', '#subTCQ', function (event) {
    event.preventDefault();
    checkTCQanswer();
  })
}

//check answer(s), must be all correct based on GRE rubric
function checkTCQanswer() {
  let incorrect = false
  for (let i = 0; i < QuizData.answers.length; i++) {
    let correctAnswer = `${QuizData.answers[i][0]}`
    let userAnswer = $(`#TCQanswer${i} option:selected`).val();
    console.log(userAnswer)
    if (correctAnswer !== userAnswer) {
      incorrect = true
      break
    }
  }
  if (incorrect) {
    wrongAnswer()
  } else {
    $('main').html(
      `
      <h4>${displayCorrectTCQ()}</h4>
      <br><br>
      <form id='newVocabForm'>

        <div id='searchBar'>
          <div>
          <label>Look up new vocabulary here please:</label>
          </div>
          <div>
          <input id='newVocab' type='text' required>
          </div>
          <div>
          <button id='searchButton' type='submit'>Search</button>
          </div>
        </div>

        <div id='searchResult'></div>
      </form>
      <br>
      <h4>Well done!<h4>
      <p>Would you like to try another one?</p>
      <button class='TCQButton' type='submit'>Yes!</button>
      <button class='readyGo' type='button'>
        <span>Back to Main Menu</span>
      </button>
      `
    )
  }
}

//show the correct answer(s) 
function displayCorrectTCQ() {
  console.log(QuizData.description)
  let html = `
  <h3>Text Completion Questions</h3>
  <h4>${QuizData.description}</h4>
  <h4>Correct Answer:</h4>
  `
  for (let i = 0; i < QuizData.answers.length; i++) {
    html += `
    <p>${i+1}. ${QuizData.options[i][QuizData.answers[i][0]]}</p>
    `
  }
  return html
}

//in the event for any wrong answer
function wrongAnswer() {
  console.log("wrong!")
  $('main').html(
    `
    <h3>${displayCorrectTCQ()}</h3>
    <br><br>
    <form id='newVocabForm'>

      <div id='searchBar'>
      
        <div>
        <label>Look up new vocabulary here please:</label>
        </div>
        <div>
        <input id='newVocab' type='text' required>
        </div>
        <div>
        <button id='searchButton' type='submit'>Search</button>
        </div>
      </div>
      
      <div id='searchResult'></div>
    </form>
    <br>
    <h4>Not quite there yet... but you are on the right track!</h4>
    <p>Would you like to try another one?</p>
    <button class='TCQButton'>Yes!</button>
    <button class='readyGo' type='button'>
        <span>Back to Main Menu</span>
    </button>
    `
  )
}

//event handler for dictionary
function watchForm() {
  $('main').on('submit', '#newVocabForm', event => {
    event.preventDefault();
    console.log('submit')
    let searchWord = $('#newVocab').val();
    console.log(searchWord)
    dictionary(searchWord);
  })
}

//add dictionary function to look up words
function dictionary(searchWord) {
  //starter for OwlBot API
  let params = {
    method: 'GET',
    headers: {
      'Authorization': 'Token ' + OwlBotKey
    }
  }

  fetch(`https://owlbot.info/api/v4/dictionary/${searchWord}`, params)
    .then(res => {
      console.log(res)
      if (res.ok) {
        return res.json()
      }
      return res.json().then(error => Promise.reject(error))
    })
    .then(definitions => showResults(definitions))
    .catch(error => {
      console.log(error);
      errorMessage(error)
    });
}

//display a list of definition for the user input word
function showResults(definitions) {
  console.log(definitions)
  let searchWord = $('#newVocab').val();
  let wordResult = '';
  $('#searchResult').html(searchWord)
  for (let i = 0; i < definitions.definitions.length; i++) {
    wordResult += `
      <ol>
      <h4>${i+1}. Part of Speech: ${definitions.definitions[i].type}</h4>
      <br>
      <h4>Definition: ${definitions.definitions[i].definition}</h4>
      <br>
      <h4>Example: ${definitions.definitions[i].example}</h4>
      <br><hr>
      </ol>
    `
  }
  $('#searchResult').html(wordResult)
}

$(
  welcomePage(),
  showQuestionTypes(),
  TCQButton(),
  submitTCQanswer(),
  watchForm()
)