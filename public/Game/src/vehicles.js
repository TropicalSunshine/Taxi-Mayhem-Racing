function Taxi(side){
    //players of the game

    this.jumpcooldown = false;
    this.jumptimer = 0;
    this.cooldown_decrement = 0;

    this.pos = 1;
    this.SHIFT = 150;
    this.isJump = false;
    this.HP = 120;

    this.height = 74;
    this.width = 144;
    this.multiplier = 1;

    if(side == 'l'){
        this.y = height - 200;
        this.x = 450 - 37;
    }
    else{
        this.y = height - 200;
        this.x = 1350 - 37;
    }
    
    this.img = loadImage('images/taxi.png');

    this.show = function(){
        image(this.img, this.x, this.y, this.height * this.multiplier, this.width * this.multiplier);
    }

    this.left = function(){
        if(this.pos != 0){
            this.x -= this.SHIFT;
            this.pos -= 1;
        }
    }

    this.right = function(){
        if(this.pos != 2){
            this.x += this.SHIFT;
            this.pos += 1;
        }
    }

    this.updateJumpStatus = function()
    {
        if(this.jumptimer > 0)
        {
            this.jumptimer -= .01; //CHANGEABLE----

            if(this.jumptimer > .5)
            {
                this.multiplier += .02;
            }
            if(this.jumptimer < .5)
            {
                this.multiplier -= .02;
            }
        }
        
        //if just went from aerial to landing
        if(this.jumptimer <= 0 && this.isJump == true)
        {
            this.isJump = false;

            this.jumpcooldown = true;
            this.cooldown_decrement = 1;

            this.multiplier = 1;
        }

        if(this.jumpcooldown == true)
        {
            this.cooldown_decrement -= .01;
            if(this.cooldown_decrement <= 0)
            {
                this.jumpcooldown = false;
            }
        }
    }

    this.jump = function()
    {
        console.log("Inside Jump");
        if(this.isJump == false && this.jumpcooldown == false)
        {
            this.isJump = true;
            this.jumptimer = 1;
        }
    }

    this.register_crash = function()
    {
        this.HP -= 1;

        if(this.HP < 80 && this.HP > 60)
        {
            this.img = loadImage('images/second_HP.png');
        }

        if(this.HP < 40)
        {
            this.img = loadImage('images/third_HP.png');
        }

        if(this.HP == 0)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
}

var ObstacleSpeedBoost = 0;
var ObsCount = 0;

function RoadObj(side){
    ObsCount++;

    if (side == 'l'){
        var lane = [263,413,563];
    }
    else{
        var lane = [1163,1313,1463];
    }
    
    var vehicles = ['images/roadobj1.png','images/roadobj2.png','images/roadobj3.png'];
    var speeds = [4,5,6];
    this.y = -150;
    this.x = lane[Math.floor(Math.random() * lane.length)];
    this.l = 74;
    this.h = 144;
    this.speed = speeds[Math.floor(Math.random() * lane.length)];
    this.img = loadImage(vehicles[Math.floor(Math.random() * vehicles.length)]);
    this.show = function(){
        image(this.img,this.x,this.y, this.l, this.h);
    }

    this.update = function(){
        if(ObsCount%50 == 0 && ObsCount != 0)
        {
            ObstacleSpeedBoost += .03;
        }
        this.y += this.speed + ObstacleSpeedBoost;
    }

}   


function Semi(side){
    //semi truck class
    RoadObj.call(this, side)
    this.img = loadImage('images/roadobj4.png')
    this.h = 250;
    this.l = 95;
}


module.exports = {
    Taxi: Taxi,
    RoadObj: RoadObj
}