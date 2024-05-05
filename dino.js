//board
    let board;
    let boardWidth = 1100;
    let boardHeight = 400;
    let context;

    //dino
    let dinoWidth = 60;
    let dinoHeight = 60 ;
    let dinoX = 50;
    let dinoY = boardHeight - dinoHeight;
    let dinoImg;

        let dino = {
            x : dinoX,
            y : dinoY,
            width : dinoWidth,
            height : dinoHeight
        }

        let dino2Width = 60;
        let dino2Height = 60;
        let dino2X = 130; 
        let dino2Y = boardHeight - dino2Height;
        let dino2Img;

        let dino2 = {
            x : dino2X,
            y : dino2Y,
            width : dino2Width,
            height : dino2Height
        }
    //cactus
    let cactusArray = [];

    let cactus1Width = 55;
    let cactus2Width = 60;
    let cactus3Width = 70;

    let cactusHeight = 60;
    let cactusX = 1100;
    let cactusY = boardHeight - cactusHeight;

    let cactus1Img;
    let cactus2Img;
    let cactus3Img;

    //physics
    let velocityX = -8;//cactus moving
    let velocityY = 0;
    let velocityY2 = 0;
    let gravity = .5;
    let gravity2 =.5;

    let gameOver = false;
    let score = 0;


    window.onload = function(){
        board = document.getElementById("board");
        board.height = boardHeight;
        board.width = boardWidth

        context = board.getContext("2d");//used for drawing on the board

        dinoImg = new Image();
        dinoImg.src = "dino.jpg";
        dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        }
        dino2Img = new Image();
        dino2Img.src = "dino2.jpg"; // Use a different image for the second dinosaur
        dino2Img.onload = function(){
        context.drawImage(dino2Img, dino2.x, dino2.y, dino2.width, dino2.height);
    }
        cactus1Img = new Image();
        cactus1Img.src = "cactus1.png"

        cactus2Img = new Image();
        cactus2Img.src = "cactus2.jpg"

        cactus3Img = new Image();
        cactus3Img.src = "cactus3.jpg"


        requestAnimationFrame(update);
        setInterval(placeCactus,1000);
        document.addEventListener("keydown", moveDino);
        document.addEventListener("keyup", moveDino2);
    } 

    function update() {
        requestAnimationFrame(update);
        if(gameOver){
            document.getElementById("restartButton").style.display = "block";
            return;
        }
        document.getElementById("restartButton").addEventListener("click", restartGame);
        
        context.clearRect(0, 0, board.width, board.height);
        //dino
        velocityY += gravity;
        dino.y = Math.min(dino.y + velocityY, dinoY);//gravity to dino
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        
        // dino2
     
        velocityY2 += gravity2;
        dino2.y = Math.min(dino2.y + velocityY2, dino2Y);//gravity to dino
        context.drawImage(dino2Img, dino2.x, dino2.y, dino2.width, dino2.height);
        
        //cactus
        for (let i = 0; i < cactusArray.length; i++){
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        
            if(detectCollision(dino, cactus) || detectCollision(dino2, cactus)){
                gameOver = true;
                dinoImg.src = "dino-dead.jpg";
                dinoImg.onload = function(){
                    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
                    
                }
                dino2Img.src = "dino-dead.jpg"; 
                dino2Img.onload = function(){
                    context.drawImage(dino2Img, dino2.x, dino2.y, dino2.width, dino2.height);
                }
            }
        }
        //score
        context.fillStyle="black";
        context.font="20px courier";
        score++;
        context.fillText(score, 5, 20)
    }
    function moveDino(e){
        if(gameOver){
            return;
        }
        if ((e.code == "ArrowUp")&& dino.y == dinoY){
            //jump
            velocityY = -12;
        }

    }
    function moveDino2(e){
        if(gameOver){
            return;
        }
        if ((e.code == "KeyW")&& dino2.y == dino2Y){
            //jump
            velocityY2 = -12;
        }
    }
    function placeCactus(){
        if(gameOver){
            return;
        }
        //place cactus
        let cactus = {
            img : null,
            x : cactusX,
            y : cactusY,
            width : null,
            height: cactusHeight
        }
        let placeCactusChance = Math.random();
    
        if (placeCactusChance >.90){
            cactus.img = cactus3Img;
            cactus.width = cactus3Width;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .80){
            cactus.img = cactus2Img;
            cactus.width = cactus2Width;
            cactusArray.push(cactus);
        }
        else if (placeCactusChance > .60){
            cactus.img = cactus1Img;
            cactus.width = cactus1Width;
            cactusArray.push(cactus);
        }

        if (cactusArray.length > 5){
            cactusArray.shift();
        }
    }

    function detectCollision(a, b){
        return (a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y) ||
            (dino2.x < b.x + b.width &&
                dino2.x + dino2.width > b.x &&
                dino2.y < b.y + b.height &&
                dino2.y + dino2.height > b.y);
    }
    
    let originalSpeed = 15;
    originalSpeed = 15;
    function restartGame() {
        gameOver = false;
        score = 0;
        velocityY = 0;
        velocityY2 = 0;
    
        cactusArray = [];
    
        dino.y = boardHeight - dinoHeight;
        dino2.y = boardHeight - dino2Height;
    
        context.clearRect(0, 0, boardWidth, boardHeight);
    
        let imagesToLoad = 4; // number of images to load
        let imagesLoaded = 1;
    
        let loadImage = function(img, src) {
            img.src = src;
            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded === imagesToLoad) {
                    drawRestartScene();
                }
            }
        }
    
        loadImage(dinoImg, "dino.jpg");
        loadImage(dino2Img, "dino2.jpg");
        loadImage(cactus1Img, "cactus1.png");
        loadImage(cactus2Img, "cactus2.jpg");
        loadImage(cactus3Img, "cactus3.jpg");
    }
    
    function drawRestartScene() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        context.drawImage(dino2Img, dino2.x, dino2.y, dino2.width, dino2.height);
        context.fillStyle="black";
        context.font="20px courier";
        context.fillText(score, 5, 20)
    }