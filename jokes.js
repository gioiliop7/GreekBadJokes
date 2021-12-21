jQuery(document).ready(function () {
  var settings = {
    url: "https://api.pushshift.io/reddit/search/submission/?subreddit=KriAnekdota&sort=desc&sort_type=created_utc&size=1000",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    let jokes = response.data;
    console.log(jokes);

    let jokes_array = [];

    jokes.forEach((element) => {
      let joke = element.title;
      let joke_text = element.selftext;
      let joke_url = element.url;
      if (joke.length < 4) {
        return;
      }
      if (joke_text == "" || joke_text == " " || joke_text == "[removed]") {
        return;
      }
      joke = joke.replace(/\n|\r/g, "<br>");
      joke_text = joke_text.replace(/\n|\r/g, "<br>");
      joke_text = joke_text.replace(/&amp;#x200B;/g, "");
      joke_text = joke_text.replace(/\\/g, "");
      jokes_array.push({ title: joke, text: joke_text, url: joke_url });
    });

    function get_random_element() {
      let randomElement =
        jokes_array[Math.floor(Math.random() * jokes_array.length)];

      let titleElement = document.getElementById("joketitle");
      let textElement = document.getElementById("joketext");
      let hrefElement = document.getElementById("redditlink");

      titleElement.innerHTML = randomElement.title;
      textElement.innerHTML = randomElement.text;
      hrefElement.setAttribute("href", randomElement.url);
    }

    get_random_element();

    $("#getrandom").click(function () {
      get_random_element();
    });
  });
});
