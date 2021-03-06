let SEQdata;
//here on is for Sentence Equivalence Questions

function SEQButton() {
  $('main').on('click', '.SEQButton', function () {
  
    fetchSEQquestions();
  });
}

//fetching SE questions
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

      SEQdata = data.data[0];
      displaySEQquestions(SEQdata);
    });
}

//display SE questions
function displaySEQquestions(SEQdata) {
  $('main').html(
    `
    <h3>Sentence Equivalence Questions</h3>
    <form>
    <h4>${SEQdata.description}</h4>
    <p>${SEQcheckBox()}</p>
     <button class='turnInSEQ' type='submit'>Turn In</button>
    </form>
     `
  );
}

function SEQcheckBox() {
  let option = '';
  for (let i = 0; i < SEQdata.options[0].length; i++) {
    option += `
    <div id='SEQcheckBox'>
    <br>
    <input id='SEQanswer' value='${SEQdata.options[0][i]}' type='checkbox'>${SEQdata.options[0][i]}
    </div>
    `;
  }
  return option;
}

function submitSEQanswer() {
  $('main').on('click', '.turnInSEQ', function (event) {
    event.preventDefault();

    checkSEQanswer();
  });
}

function checkSEQanswer() {
  let correctAnswer1 = `${SEQdata.options[0][SEQdata.answers[0][0]]}`;
  let correctAnswer2 = `${SEQdata.options[0][SEQdata.answers[0][1]]}`;

  let userAnswer = Array.from($('input:checked')).map(el => $(el).val());

  if (correctAnswer1 === userAnswer[0] && correctAnswer2 === userAnswer[1]) {
    $('main').html(
      `
        <h4>${displayCorrectSEQ()}</h4>
        <br><br>
          <form id='newVocabForm'>

            <div id='searchBar'>
          
              <div><label>Look up new vocabulary here please:</label></div>
              <div><input id='newVocab' type='text' required></div>
              <div><button id='searchButton' type='submit'>Search</button></div>
            </div>
            
            <div id='searchResult'></div>
          </form>
        <br>
        <h4>Well done!<h4>
        <p>Would you like to try another one?</p>
        <button class='SEQButton'>Yes!</button>
        <button class='readyGo' type='button'>
          <span>Back to Main Menu</span>
        </button>
        `
    );
  } else {
    wrongSEQanswer();
  }
}


function displayCorrectSEQ() {
  let html = `
  <h3>Sentence Equivalence Questions</h3>
  <h4>${SEQdata.description}</h4>
  <h4>Correct Answer:</h4>
  `;
  for (let i = 0; i < SEQdata.answers[0].length; i++) {

    html += `<p>${i + 1}. ${SEQdata.options[0][SEQdata.answers[0][i]]}</p>`;
  }

  return html;
}

function wrongSEQanswer() {

  $('main').html(
    `
    <h4>${displayCorrectSEQ()}</h4>
    <br><br>
    <form id='newVocabForm'>

      <div id='searchBar'>
        <div><label>Look up new vocabulary here please:</label></div>
        <div><input id='newVocab' type='text' required></div>
        <div><button id='searchButton' type='submit'>Search</button></div>
      </div>

      <div id='searchResult'></div>
      
    </form>

    <br>
    
    <h3>Not quite there yet... but you are on the right track!</h3>
    <p>Would you like to try another one?</p>
    <button class='SEQButton'>Yes!</button>
    <button class='readyGo' type='button'>
          <span>Back to Main Menu</span>
    </button>
    `
  );
}

$(
  SEQButton(),
  submitSEQanswer()
)
