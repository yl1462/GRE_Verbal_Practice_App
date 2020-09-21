// let currentQuestionNumber = 0;
// let totalNumberOfQuestion = data.length;
// let totalScore = 0;

const GREKey = 'f6bf5906c1msh45ccd6bea4e4595p19e710jsn64d68bc7e7d2';
const GRESearchURL = 'https://gre-verbal.p.rapidapi.com';

const OwlBotKey = '9faa238a2ea15e95757bb04c25875855ffbb8f94';
const OwlBotSearchURL = 'https://owlbot.info/api/v4/dictionary/';

function welcomePage() {
  console.log("welcome page running")
  $('main').html(
    `
      <section>
        <div>
          <h3>Thank you so much for choosing us! Let's go practicing GRE verbal questions.</h3>
        </div>
        <div>
          <button class='readyGo' type='button'>
            <span>Ready? GO!</span>
          </button>
        </div>
      </section>
      <footer>
        <hr>
        <section class="contactFont">
          <h5>Contact for Tech Support</h5>
            <div id="Contact">
              <div class="group">
                <div class="item-double">
                  <form action="https://formspree.io/xgenbrgo" method="POST" enctype="multipart/form-data">
                    <label for="user-name">Name:</label>
                    <input id="user-name" type="text" name="name" required>

                    <label for="user-email">Email:</label>
                    <input id="user-email" type="text" name="email" required>

                    <label for="user-message">Message:</label>
                    <textarea id="user-message" name="message" required></textarea>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
        </section>
      </footer>
    `
  )
}

function showQuestionTypes() {
  $('main').on('click', '.readyGo', function () {
    console.log("display questions type choice");
    displayQuestionTypes();
  })
}

function displayQuestionTypes() {
  $('main').html(
    `
    <section class="questionTypes">
      <div>
        <h3>Text Completion Questions</h3>
        <p>Text completion questions omitted crucial words from short passages and ask the test taker to use the remaining information in the passage as a basis for selecting words or short phrases to fill the blanks and create a coherent, meaningful whole.</p>
        <button class='questionTypeButton' type='button'>
        <span>I choose Text Completion Questions</span>
        </button>
      </div>

      <hr>

      <div>
        <h3>Sentence Equivalence Questions</h3>
        <p>Sentence Equivalence questions consist of a single sentence with just one blank, and you will be asked to find two choices that lead to a complete, coherent sentence while producing sentences that mean the same thing.</p>
        <button class='questionTypeButton' type='button'>
        <span>I choose Sentence Equivalence Questions</span>
        </button>
      </div>
    <section>
    `
  )
}

function TCQButton() {
  $('main').on('click', '.questionTypeButton', function () {
    console.log('displaying TCQ questions');
    fetchTCQquestions();
  });
}

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
      console.log(data)
    })
}

function displayTCQquestions(data) {
  let html = '';
  for (let i = 0; i < data.options.length; i++) {
    html += `
        <form>
          <h4>${data[0].description}</h4>
          <div class="formDiv">
          <label>
            <input type='radio' name='answer' value='${data[0].options[i]}'/>${data[0].options[i]}
          </label>
          </div>
          <button class='turnIn' type='submit'>Turn in</button>
        </form>
      `
  }
  $('main').html(
    html
  )
}

$(
  welcomePage(),
  showQuestionTypes(),
  TCQButton()
)