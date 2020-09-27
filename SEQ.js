//here on is for Sentence Equivalence Questions

function SEQButton() {
  $('main').on('click', '.SEQButton', function () {
    console.log('displaying SEQ questions');
    fetchSEQquestions();
  });
}

//fetching tc questions
function fetchSEQquestions() {
  fetch("https://gre-verbal.p.rapidapi.com/api/v1/questions?subcat=SE&count=10", {
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
      displaySEQquestions(QuizData)
    })
}

//display SE questions
function displaySEQquestions(QuizData) {
  $('main').html(
    `
    <form>
    <h4>${QuizData.description}</h4>
    <p>${SEQcheckBox(QuizData.options)}</p>
     <button class='turnIn' type='submit'>Turn in</button>
    </form>
     `
  )
}

function SEQcheckBox(QuizData) {
  let option = ''
  for (let i = 0; i < QuizData.options[0].length; i++) {
    option += `
    <br>
    <input type='checkbox'>${QuizData.options[0][i]}
    `
  }
  return option
}

function submitSEQanswer() {
  $('main').on('submit', 'form', function (event) {
    event.preventDefault();
    checkSEQanswer();
  })
}

function checkSEQanswer() {
  let incorrect = false
  for (let i = 0; i < QuizData.answers.length; i++) {
    let correctAnswer = `${QuizData.answers[0][i]}`
    let userAnswer = $(`#SEQanswer${i} input:checked`).val();
    if (correctAnswer !== userAnswer) {
      incorrect = true
      break
    }
  }
  if (incorrect) {
    wrongSEQanswer()
  } else {
    $('main').html(
      `
      <h4>Well done!<h4>
      <p>Would you like to try another one?</p>
      <button class='SEQButton' type='submit'>Yes!</button>
      <button class='readyGo' type='button'>
        <span>Back to Main Menu</span>
      </button>
      `
    )
  }
}

function displayCorrectSEQ() {
  console.log(QuizData.description)
  let html = `<h2>${QuizData.description}</h2>`
  for (let i = 0; i < QuizData.answers.length; i++) {
    html += `
    <button class='SEQCorrectAnswer' type='submit'>${QuizData.answers[i][0]}</button>
    `
  }
  return html
}

function wrongSEQanswer() {
  console.log("wrong!")
  $('main').html(
    `
    <h3>Not quite there yet... but you are on the right track!</h3>
    <h4>${displayCorrectSEQ()}</h4>
    <p>Would you like to try another one?</p>
    <button class='SEQButton' type='submit'>Yes!</button>
    `
  )
} 

$(
  SEQButton(),
  submitSEQanswer()
)