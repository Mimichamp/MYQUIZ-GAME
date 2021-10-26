class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(25);
    text("Result of the quiz",340,50);
    textSize(39);
    text("------------------",320,65);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      var displays=230;
      fill("blue");
      textSize(20);
      text("NOTE:contestants who answered correct are highlighted in green!",130,230);
    

    //write code to add a note here
    for(var i in allContestants){
      var correctAns="2";
      if(correctAns==allContestants[i].answer){
        fill("green");}
      else{
        fill("red");
      }
    //write code to highlight contest who answered correctly
    displays+=20;
    text(allContestants[i].name+":"+allContestants[i].answer,240,displays);
  }
}
}
}