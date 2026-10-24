// Canvas and context
let c = document.querySelector(`#pong`)
let ctx = c.getContext(`2d`)
let scoreDivs = document.querySelectorAll(`#score div`)

// Chooses player names
var p1Name = prompt("Player 1's Name:");
var p2Name = prompt("Player 2's Name:");


// Timer to make the game run at 60fps
let timer = setInterval(main, 1000/60)

// Global friction variable
let fy = .97

// Ball setup
let ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

// Player setup
let players = [];
players[0] = new Player();
players[1] = new Player();
players[0].pad = new Box();
players[1].pad = new Box();
console.log(players)

// Paddle setup
let pads = [];
pads[0] = players[0].pad;
pads[1] = players[1].pad;

pads[0].w = 20
pads[0].h = 150
pads[0].x = 0 + pads[0].w/2
pads[1].w = 20
pads[1].h = 150
pads[1].x = c.width - pads[1].w/2
pads[1].color = `limegreen`

//Setup for score
let score = [0,0]

function main()
{
    // Erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    // Player 1 accelerates when key is pressed 
    if(keys[`w`])
    {
       pads[0].vy += -pads[0].force
    }

    if(keys[`s`])
    {
        pads[0].vy += pads[0].force
    }

    // Player 2 accelerates when key is pressed
    if(keys[`i`])
    {
       pads[1].vy += -pads[1].force
    }

    if(keys[`k`])
    {
        pads[1].vy += pads[1].force
    }


    // Applies friction
    pads[0].vy *= fy
    pads[1].vy *= fy
    // Player movement
    pads[0].move();
    pads[1].move();
    // Ball movement
    ball.move()

    // Player 1 boundary collision
    if (pads[0].y < 0+pads[0].h/2)
    {
        pads[0].y = 0+pads[0].h/2
    }
    if (pads[0].y > c.height-pads[0].h/2)
    {
        pads[0].y = c.height-pads[0].h/2
    }

    // Player 2 boundary collision
    if (pads[1].y < 0+pads[1].h/2)
    {
        pads[1].y = 0+pads[1].h/2
    }
    if (pads[1].y > c.height-pads[1].h/2)
    {
        pads[1].y = c.height-pads[1].h/2
    }

    // Ball collision 
    if (ball.x < 0)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        score[1] += 1
    }
    if (ball.x > c.width)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        score[0] += 1
    }
    if (ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if (ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy       
    }


    // Player 1 with ball collision
    if (ball.collide(pads[0]))
    {
        ball.x = pads[0].x + pads[0].w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    // Player 2 with ball collision
    if (ball.collide(pads[1]))
    {
        ball.x = pads[1].x - pads[1].w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    // Draw the objects
    pads[0].draw()
    pads[1].draw()
    ball.draw()

    for (let i = 0; i < scoreDivs.length; i++)
    {
        scoreDivs[i].innerText = `${i === 0 ? p1Name : p2Name}: ${score[i]}`
    }
}
