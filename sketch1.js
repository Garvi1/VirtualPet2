//Create variables here
var  dog, happyDog, database, foodS, foodStock
var dogImg,dogImg1
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  /*.ref is used to refer to the location of the database
  value we care about */
  foodStock=database.ref("Food");
  /* .on creates a listener here which keeps listening    
 to the changes in the database */  
  foodStock.on("value",readStock);
  //Assign firebase database to variable database.
  database = firebase.database()
  dog = createSprie(250,250,20,20);
  dog.addImage(dogImg);
}


function draw() {  
 background(46,139,87);

 if(keyWentDown(UP_ARROW)){
   writeStock( foodS );//foodS = RemaingFood
   dog.addImage(dogImg1);
 }

  drawSprites();
  //add styles here

}


function readStock(data){
  foodS = data.val()
 }


function writeStock(x){
if(x < 0){
x = 0
}
else {
x = x - 1
}
database.ref('/').update({
  Food:x
})
}




