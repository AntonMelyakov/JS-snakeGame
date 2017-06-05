(function() {
  let chosenSnake;
  let chosenApple;
  let chosenBackground;
  let difficultyChose;

  function customed() {
    chosenSnake = $("input[name='bodyChoose']:checked").val() + ".png"
    chosenApple = $("input[name='appleChoose']:checked").val() + ".png"
    chosenBackground = $("input[name='backgroundChoose']:checked").val();
    difficultyChose = $("input[name='difficultyChoose']:checked").val();
  }

  function readyToGo() {
    customed();
    //if something is undefined:
    if (chosenSnake == "undefined.png" || chosenApple == "undefined.png" || chosenBackground == undefined || difficultyChose == undefined) {

      loadJson("https://api.myjson.com/bins/19rl5d")
    }else {
      newGame(difficultyChose, chosenApple, chosenSnake, chosenBackground);
    }
  }

  function loadJson(jsonFile) {
    $.getJSON(jsonFile, function(json){
      chosenSnake = json.chosenSnake + ".png"
      chosenApple = json.chosenApple + ".png"
      chosenBackground = json.chosenBackground;
      difficultyChose = json.difficulty;
        newGame(difficultyChose, chosenApple, chosenSnake, chosenBackground);
    })
  }

  $("#clicked").on("click", function() {readyToGo()})
  $("#one-json").on("click", function() {loadJson("https://api.myjson.com/bins/19rl5d")})
  $("#two-json").on("click", function() {loadJson("https://api.myjson.com/bins/z1s9d")})
}) ();
