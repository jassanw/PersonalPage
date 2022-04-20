const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const gravity = 0.2

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width, canvas.height)


class Sprite {
    constructor({position,velocity}) {
        this.position  = position
        this.velocity = velocity
        this.height = 150
        this.jumpHeight = -10
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,50,this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }

    jump(){
        if(this.position.y + this.height < canvas.height) return

        this.velocity.y = this.jumpHeight

    }
}

const player = new Sprite({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x:0,
        y:0
    }
})




const enemy = new Sprite({
    position: {
        x:400,
        y:100
    },
    velocity: {
        x:0,
        y:0
    }
})



function clearScreen(){
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
}


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft:{
        pressed : false
    }
}


function animate(){
    window.requestAnimationFrame(animate)
    clearScreen()
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0
    if(keys.a.pressed && player.lastKey==='a'){
        player.velocity.x = -1
    }
    else if(keys.d.pressed && player.lastKey==='d'){
        player.velocity.x = 1

    }

    if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight'){
        enemy.velocity.x = 1
    }
    else if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
        enemy.velocity.x = -1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = event.key
            break;

        case 'a':
            keys.a.pressed = true
            player.lastKey = event.key
            break;

        case 'w':
            player.jump()
            break;
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = event.key
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = event.key
            break;

        case 'ArrowUp':
            enemy.jump()
            break;    

    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        
        case 'a':
            keys.a.pressed = false
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
    }
})
