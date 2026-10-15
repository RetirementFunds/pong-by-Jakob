// Canvas and context
let c = document.querySelector(`#pong`)
let ctx = c.getContext(`2d`)

// Chooses player names
var p1Name = prompt("Player 1's Name:");
var p2Name = prompt("Player 2's Name:");

var p1Score = 0;
var p2Score = 0;
document.getElementById("p1score").textContent = p1Name + ": " + p1Score;
document.getElementById("p2score").textContent = p2Name + ": " + p2Score;

// Timer to make the game run at 60fps
let timer = setInterval(main, 1000/60)

// Global friction variable
let fy = .97

// Player 1 (p1) setup
let p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2

// Player 2 (p2) setup
let p2 = new Box2();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2

// Ball setup
let ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

function main()
{
    // Erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    // p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       p1.vy += -p1.force
    }

    if(keys[`s`])
    {
        p1.vy += p1.force
    }

    //p2 accelerates when key is pressed
    if(keys[`i`])
    {
       p2.vy += -p2.force
    }

    if(keys[`k`])
    {
        p2.vy += p2.force
    }


    // Applies friction
    p1.vy *= fy
    p2.vy *= fy
    // Player movement
    p1.move();
    p2.move();
    // Ball movement
    ball.move()

    // p1 collision
    if (p1.y < 0+p1.h/2)
    {
        p1.y = 0+p1.h/2
    }
    if (p1.y > c.height-p1.h/2)
    {
        p1.y = c.height-p1.h/2
    }

    // p2 collision
    if (p2.y < 0+p2.h/2)
    {
        p2.y = 0+p2.h/2
    }
    if (p2.y > c.height-p2.h/2)
    {
        p2.y = c.height-p2.h/2
    }

    // Ball collision 
    if (ball.x < 0)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        p2Score++
        document.getElementById("p2score").textContent = p2Name + ": " + p2Score;
    }
    if (ball.x > c.width)
    {
        ball.x = c.width/2
        ball.y = c.height/2
        p1Score++
        document.getElementById("p1score").textContent = p1Name + ": " + p1Score;
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


    // p1 with ball collision
    if (ball.collide(p1))
    {
        ball.x = p1.x + p1.w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    // p2 with ball collision
    if (ball.collide(p2))
    {
        ball.x = p2.x - p2.w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    // Draw the objects
    p1.draw()
    p2.draw()
    ball.draw()

    //Reset game
    if (p1Score >= 10){
        alert(p1Name + " Wins!")
        p1Score = 0;
        p2Score = 0;
        document.getElementById("p1score").textContent = p1Name + ": " + p1Score;
        document.getElementById("p2score").textContent = p2Name + ": " + p2Score;
    }
    if (p2Score >= 10){
        alert(p2Name + " Wins!")
        p1Score = 0;
        p2Score = 0;
        document.getElementById("p1score").textContent = p1Name + ": " + p1Score;
        document.getElementById("p2score").textContent = p2Name + ": " + p2Score;
    }

}
