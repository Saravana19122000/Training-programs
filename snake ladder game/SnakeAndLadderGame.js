const playercount= 2
var position=1
let newposition
let dicevalarray=[]
let resultarray=[]
let snake=87, snaketail=10
let ladderbottom=6,laddertop=93
let diceval
function adddicevalarray(){
   for (let j = 1; j <= playercount; j++) {
      let player={ name: "Player"+j, position: 1 }
      let result=[]
      dicevalarray.push(player)
      resultarray.push(result)
      }
      
}
adddicevalarray()
function rolldice(){
   diceval=Math.floor(Math.random()*6+1)
   return diceval
}

function movepositon(player){

   if(player.position+diceval<=100){
      player.position=player.position+diceval;
    if(player.position==snake){
      player.position=snaketail;
   }
   else if(player.position==ladderbottom){
      player.position=laddertop;
   }
     
   return player.position
   }
   
}
   function playgame(){
    for (let i = 0; i < playercount; i++) {
        const currentPlayer = dicevalarray[i];
        rolldice()
        console.log(currentPlayer.name,"turn.");
        movepositon(currentPlayer);
        console.log(currentPlayer.name,"rolled ",diceval," and is now at position",currentPlayer.position);

        if (currentPlayer.position == 100) {
            console.log(currentPlayer.name,"wins!");
            return;
        }
       
      resultarray[i].push(currentPlayer.position)
        }

    setTimeout(playgame, 1000);
    function results(){
   
      for (let index = 0; index < playercount; index++) {
         console.log(resultarray[index])
         }
  }
  results()
    
}
 
playgame()

// node SnakeAndLadderGame.js