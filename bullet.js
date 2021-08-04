class Bullet{
    constructor(isToRight, playerPos){
        this.bulletSprite = createSprite(playerPos[0], playerPos[1], 3, 1);
        this.bulletSprite.shapeColor = "yellow";
        this.timesCollided = 0;
        this.bulletSprite.lifetime = 800;
        if(isToRight){
            this.bulletSprite.velocityX = 10;
        }else{
            this.bulletSprite.velocityX = -10;

        }
    }
    addCollidedCount(){
        this.timesCollided++;
    }
    destroySprite(){
        this.bulletSprite.destroy();
    }
    returnCollidedCount(){
        return this.timesCollided;
    }
    returnSprite(){
        return this.bulletSprite;
    }checkCollisionWithZombies(){
        for(var i = 0; i < zombiesGroup.length; i++){
            if(this.bulletSprite.isTouching(zombiesGroup[i].sprite)){
                zombiesGroup[i].destroyZombie()
                this.bulletSprite.destroy();
                var isCollided = true
                
            }else{
                isCollided = false;
            }
        }
        return isCollided
    }
    
}