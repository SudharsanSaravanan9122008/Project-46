class Zombie{
    constructor(animation, isFromRight){
        if(isFromRight){
            this.sprite = createSprite(Math.round(random(750, 775)), Math.round(random(450, 475)));
            this.sprite.velocityX = -2;
        }else{
            this.sprite = createSprite(Math.round(random(25, 50)), Math.round(random(450, 475)));
            this.sprite.velocityX = 2;
        }
        this.sprite.addAnimation("Zombie", animation);
        this.sprite.scale = 0.15;
        
        this.sprite.lifetime = 800;
        this.allReadyDestroyed = false;
    }
    isCollidedWithPlayer(){
        if(this.sprite.isTouching(player)){
            return(true);
            
        }else{
            return(false);
        }
    }
    destroyZombie(){
        if(this.allReadyDestroyed === false){
            this.sprite.destroy();
            this.allReadyDestroyed = true;
        }
    }
    
}