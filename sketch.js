//Create variables here
var dog 
var happyDogImage
var dogImage
var database
var foodS=0;
var food
var foodObj
var foodStock
var lastfed
var foodStock
function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();
  foodStock=database.ref('foodObj');
  
  feed=createButton("Feed the dog");
  feed.position(550,100);
  feed.mousePressed(feedDog);

  addFood=createButton("add the Food");
  addFood.position(450,100);
  addFood.mousePressed(addFoods);
  foodObj=new Food(200,200,20,20);
  foodStock.on('value',readStock);
  //alert("foodStock "+foodS);
 
 
  dog=createSprite(450,250,20,20)
  dog.addImage("dog",dogImage);
  dog.scale=0.2;

}


function draw() { 
  background("green") ;
  fill("white")
  textSize(15);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastfed=data.val();
  })

  if(lastfed>12){
    text("last fed :"+lastfed%+12+"pm",350,30);
  }else if (lastfed==0){
    text("last fed :12 Am",350,30);
  }else{
    text("last fed :"+lastfed+"Am",350,30);
  }


  text("food remaning :"+foodS,300,50);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    //alert("adding image"+happyDogImage);
    dog.addImage("dog",happyDogImage);
  }
  dog.display();
  foodObj.display();
  drawSprites();
  //add styles here
 
}


function readStock(data){
 // alert("data is "+data);
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  }
  
  function writeStock(x){
    //alert("foodS is ?"+foodS);
    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        foodObj : x,
      })
    }

function UP_ARROW(){
  if(keyWentDown(UP_ARROW)){
   // alert("foodS is"+foodS);
writeStock(foodS)
dog.addImage("doghappy", happyDogImage)
  }
}

function feedDog (){
  dog.addImage("dog", happyDogImage);
  foodS--;
  database.ref('/').update({
    foodObj:foodS,
    FeedTime:hour()
  })

 //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
/*database.ref("/").update({
  food : foodObj.getFoodStock(),
  FeedTime:hour()
})*/
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    foodObj:foodS
  })
}

