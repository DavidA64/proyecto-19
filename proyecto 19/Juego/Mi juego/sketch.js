var dinosaurio, dino1, dino2
var piso,piso2
var psiofalso 
var nubeImagen
var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6
var pajaros
var volando, estrellado 
var nubesFuera 
var obstaculosFuera
var gameState = "playing"
var superFinal, fin
var volver, reset
var marcador = 0
var pajaritosmax 
var pajaromuerto
var pajarote 




function preload(){
  dino1 = loadAnimation("trex1.png","trex3.png","trex4.png")
  dino2 = loadImage("trex_collided.png")

  piso2 = loadImage("ground2.png")
  nubeImagen = loadImage("cloud.png")
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")
  fin = loadImage("gameOver.png")
  reset = loadImage("restart.png")

}






function setup(){
  createCanvas(600,200)
  dinosaurio = createSprite(50,150,20,20)
 dinosaurio.addAnimation("tRex corriendo",dino1)
 dinosaurio.addImage("morir",dino2)

 
 

 superFinal = createSprite(300,100)
 superFinal.scale = 1
 superFinal.addImage("perdiste", fin)
 volver = createSprite(300, 150)
 volver.scale = 0.5
 volver.addImage("intentar", reset)

  dinosaurio.scale = 0.6
  /*dinosaurio.debug = true*/
dinosaurio.setCollider("circle",0,0,30)


  piso = createSprite(50,180,10,10)
  piso.addImage("truco",piso2)

pisofalso = createSprite(50,190,10,10)
pisofalso.visible = false

nubesFuera = new Group()

obstaculosFuera = new Group()

superFinal.visible = false
volver.visible = false

}

function draw(){
  background("white")
  drawSprites()



/*console.log("movimiento2",dinosaurio.y)*/
dinosaurio.collide(pisofalso)



if(gameState === "playing"){
  piso.velocityX = -(7 + 3*marcador/300)
  /*console.log("movimiento",piso.x)*/
  if(piso.x < 0){
    piso.x = piso.width/2
  }

  if(keyDown("space") && dinosaurio.y >= 156){
    dinosaurio.velocityY = -17
}
nubesIn()
obstaculosIn()
dinosaurio.velocityY += 1.4
if(obstaculosFuera.isTouching(dinosaurio)){
gameState = "gameOver"

superFinal.visible = true
volver.visible = true

}






if(frameCount%1 === 0){
  marcador += 1
 
  

}



}

if(gameState === "gameOver"){

reiniciar()


}

textSize(14)
fill("black")
text("Puntuación: " + marcador,450,13)




}

function nubesIn(){
if(frameCount%100 === 0){
var nubes
nubes = createSprite(600,50,20,20)
nubes.velocityX = -(3+5*marcador/300)
nubes.addImage("movimiento", nubeImagen)
nubes.y = Math.round(random(50,20))
nubes.lifetime = 250
nubesFuera.add(nubes)


}

if(frameCount%50 === 0){
  var nubes
  nubes = createSprite(800,70,20,20)
  nubes.velocityX = -(5+1*marcador/300)
  nubes.addImage("movimiento", nubeImagen)
  nubes.y = Math.round(random(70,80))
  nubes.lifetime = 200
  dinosaurio.depth = nubes.depth
dinosaurio.depth += 1
nubesFuera.add(nubes)
  }
}

function obstaculosIn(){


if(frameCount%100 === 0){
var obstaculo
obstaculo = createSprite(600,160)
obstaculo.velocityX = -(7+3*marcador/300)
obstaculo.scale = 0.6
obstaculo.lifetime = 200
var mate = Math.round(random(1,6))
dinosaurio.depth = obstaculo.depth
dinosaurio.depth += 1
switch(mate){
case 1: obstaculo.addImage(obstaculo1)
break
case 2: obstaculo.addImage(obstaculo2)
break
case 3: obstaculo.addImage(obstaculo3)
break
case 4: obstaculo.addImage(obstaculo4)
break
case 5: obstaculo.addImage(obstaculo5)
break
case 6: obstaculo.addImage(obstaculo6)
break
default: break
}
obstaculosFuera.add(obstaculo)
  }
}










function reiniciar(){


obstaculosFuera.setVelocityXEach(0)
dinosaurio.changeImage("morir",dino2)
dinosaurio.velocityY = 0
nubesFuera.setVelocityXEach(0)
piso.velocityX = 0 
obstaculosFuera.setLifetimeEach(-1)
//pajaros.addImage("V",estrellado)

nubesFuera.setLifetimeEach(-1)
//pajaros.changeImage("V",estrellado)
dinosaurio.changeImage("morir",dino2)












  if(mousePressedOver(volver)){
    dinosaurio.changeAnimation("tRex corriendo",dino1)
    obstaculosFuera.destroyEach() 
    nubesFuera.destroyEach()  
    superFinal.visible = false
    volver.visible = false
    marcador = 0
    gameState = "playing"
  
    }







}






