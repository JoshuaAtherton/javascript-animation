/*
Zerlin
TCSS 491 - Computational Worlds
Joshua Atherton, Michael Josten, Steven Golob
*/

class Droid extends Entity {
    constructor(game, spritesheet, startX, startY) {
        super(game, startX, startY, 0, 0);
        this.animation = new Animation(spritesheet, 100, 100, 1400, 0.1, 14, true, 1);
        this.ctx = game.ctx;
    }
    update() {
        //make the droid mouse phobic
        if (this.game.mouse) {
            let difX = this.game.mouse.x - this.x;
            let difY = this.game.mouse.y - this.y;
            if (Math.abs(difX) < 100 && Math.abs(difY) < 100) {
                this.x -= difX / 10;
                this.y -= difY / 10;
                if (this.x < 0) this.x = 0;
                if (this.y < 0) this.y = 0;
            }
        }
    }
    draw() {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

class Boy extends Entity {
    constructor(game) {
        super(game, 300, 433, 0, 0);
        //animation 
        //(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
        this.idle = new Animation(AM.getAsset("img/boy-idle.png"), 
                                483, 690, 966, 0.35, 2, true, .3);
        // this.jump = new Animation(AM.getAsset("../img/boy-jump-right.png"), 
        //                         492, 690, 690, 1, 2, false, .3);
        this.jumpRight = new Animation(AM.getAsset("img/boy-jump-right.png"), 
                                492, 690, 690, 1, 2, false, .3);
        this.jumpLeft = new Animation(AM.getAsset("img/boy-jump-left.png"), 
                                492, 690, 690, 1, 2, false, .3);
        this.runRight = new Animation(AM.getAsset("img/boy-run-Right.png"), 
                                418, 690, 2508, 0.2, 6, true, .3); 
        this.runLeft = new Animation(AM.getAsset("img/boy-run-Left.png"), 
                                418, 690, 2508, 0.2, 6, true, .3); 
        this.sprite = this.idle;
        this.jumping = false;
        this.ground = 433;

        this.facingDirection = null;
                                    
        this.ctx = game.ctx;
    }
    update() {
        if(this.game.moveRight && !this.jumping)  {
            this.sprite = this.runLeft;
        } else if (this.game.moveLeft && !this.jumping) {
            this.sprite = this.runRight;
        } else if (this.game.jump || this.jumping) {
            console.log('jump w key down');
            this.jumping = true;
            if (this.jumping) {
                if(this.facingDirection === 'left') {
                    console.log('jump left');
                    this.sprite = this.jumpLeft;
                } else if (this.facingDirection === 'right') {
                    console.log('jump right');
                    this.sprite = this.jumpRight;
                }

                if (this.sprite.finished()) {
                    this.jumping = false;
                    this.sprite.elapsedTime = 0;
                    this.y = this.ground;
                } else {
                    let jumpDistance = this.sprite.elapsedTime / this.sprite.totalTime;
                    let totalHeight = 200;
            
                    if (jumpDistance > 0.5)
                        jumpDistance = 1 - jumpDistance;
            
                    let height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
                    this.y = this.ground - height;
                }
            }

        } else if (!this.game.moveLeft || !this.game.moveRight) { // idle
            this.sprite = this.idle;
            this.facingDirection = 'right';
        } 
    }
    draw() {
        this.sprite.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

class Bat extends Entity {
    constructor(game, startX, startY, direction) {
        super(game, startX, startY, 230, 5);
        this.direction = direction;
        this.flyRight = new Animation(AM.getAsset("img/batRight.png"), 180, 245, 720, .15, 4, true, .5);
        this.flyLeft = new Animation(AM.getAsset("img/batLeft.png"), 180, 245, 720, .15, 4, true, 1);
        
        // if (this.direction === 'left') {
        //     // this.x = startX;
        //     this.x = 1150;
        // }
        
        this.ctx = game.ctx;
    }
    update() {
        if (this.direction === 'left') {
            this.x -= this.game.clockTick * this.deltaX;
            // this.y -= this.game.clockTick * this.deltaY;

            if (this.x < -110) {
                this.x = 1150;
                // if (this.y > 450) {
                //     this.y -= Math.floor(Math.random() * 400) + 1;
                // }
            }
        } else {
            this.x += this.game.clockTick * this.deltaX;
            // this.y += this.game.clockTick * this.deltaY;

            if (this.x > 1150) {
                this.x = -110;
                // if (this.y > 450) {
                //     this.y -= Math.floor(Math.random() * 400) + 1;
                // }
            }
        }
    }
    draw() {
        if (this.direction === 'left') {
            this.flyLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        } else {
            this.flyRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
    }
}




