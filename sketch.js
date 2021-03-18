var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var addfood,Feed,fedtime;
var FoddObj,lastFed;
var Feedfood;
function preload(){
   dogImg=loadImage("Images/dogImg.png");
   dogImg1=loadImage("Images/dogImg1.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  FoddObj = new Food()

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
  addfood = createButton("AddFood")
  addfood.position(750,95)
  addfood.mousePressed(addFoods)
  Feed = createButton("FeedTheDog")
  Feed.position(750,120)
  //We Are Creatig This Function To Update Food Stock And Last Fed Time
Feed.mousePressed(FeedFoods)
}

// function to display UI
function draw() {
  background(46,139,87);
 
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }*/
FoddObj.display();
fedtime = database.ref('Feedtime')
fedtime.on("value",function(data){
lastfed = data.val()
});
fill("black")
textSize(20)
if(lastFed >= 12){
text('lastFed' + lastFed%12  + 'pm' ,340,30)
}
else if(lastFed == 0){
text('lastFed:12am',340,30 )
}
else{
text('lastFed:' + lastFed + 'am',340,30)


}
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  //text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function FeedFoods (){

dog.addImage(dogImg1);
if(FoddObj.getFoodStock() <= 0){
FoddObj.UpdateFoodStock(FoddObj.getFoodStock() * 0)
}
else{
FoddObj.UpdateFoodStock(FoddObj.getFoodStock() - 1) 

}
database.ref('/').update({
  Food:FoddObj.getFoodStock(),
  fedtime:hour()
})
}