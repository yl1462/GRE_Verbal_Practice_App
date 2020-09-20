// let currentQuestionNumber = 0;
// let totalNumberOfQuestion = resJson.data.length;
// let totalScore = 0;

// const GREKey = 'f6bf5906c1msh45ccd6bea4e4595p19e710jsn64d68bc7e7d2';
// const GRESearchURL = 'https://gre-verbal.p.rapidapi.com';

// const OwlBotKey = '9faa238a2ea15e95757bb04c25875855ffbb8f94';
// const OwlBotSearchURL = 'https://owlbot.info/api/v4/dictionary/';

function welcomePage() {
  $('main').html(
    `<section>
      <div>
        <h3>Thank you so much for choosing us! Let's go practicing GRE verbal questions.</h3>
      </div>
      <div>
        <button class='start-button' type='button'>
           <span>Ready? GO!</span>
        </button>
      </div>
    </section>`
  )
}

$(
  welcomePage()
)