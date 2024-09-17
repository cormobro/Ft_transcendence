			//---------- Canvas infos ----------------------------------------------------------------------

			
			const canvas = document.getElementById("myCanvas");
			const ctx = canvas.getContext("2d");
			//canvas.width = window.innerWidth * 3/4;
			//canvas.height = canvas.width * 2/3;
			const navbar = document.querySelector('nav.navbar');
			let navbarHeight = navbar.offsetHeight;
			canvas.height = window.innerHeight - navbarHeight;
			canvas.width = canvas.height * 3/2;
			console.log(`Canvas width: ${canvas.width}, height: ${canvas.height}`);

			//----------- Ball coordinates -----------------------------------------------------------------

			let x = canvas.width / 2;
			let y = canvas.height - 10;

			//---------- Ball vectors/size/bounce angles/speed----------------------------------------------

			let dx = (canvas.width / 2) / 200;
			let dy = -1 * ((canvas.height / 2) / 200);
			const ballRadius = 10;
			let relativeIntersectionY = 0;
			let normalizedIntersectionY = 0;
			let bounceAngle = 0;
			let ballSpeed = canvas.width / 250;

			//---------- Paddle size/coordinates/state------------------------------------------------------

			let paddleHeight = canvas.height / 4.5;
			const paddleWidth = 10;
			let leftPaddle = (canvas.height - paddleHeight) / 2;
			let rightPaddle = (canvas.height - paddleHeight) / 2;
			let leftPaddleDownPressed = false;
			let leftPaddleUpPressed = false;
			let rightPaddleDownPressed = false;
			let rightPaddleUpPressed = false;

			//---------- Interval is the current running "loop" --------------------------------------------

			let interval = 0;
			let time = new Date();
			let oldTime = new Date();

			//---------- Players related informations ------------------------------------------------------

			let leftScore = 0;
			let rightScore = 0;
			let playersCount = 8;
			let	players = [
				{name:"Player 1", score:0, alive:true},
				{name:"Player 2", score:0, alive:true},
				{name:"Player 3", score:0, alive:true},
				{name:"Player 4", score:0, alive:true},
				{name:"Player 5", score:0, alive:true},
				{name:"Player 6", score:0, alive:true},
				{name:"Player 7", score:0, alive:true},
				{name:"Player 8", score:0, alive:true}
			];

			//---------- Menu related informations ---------------------------------------------------------

			let boxHover = false;
			let menuBool = true;

			//---------- player1 and player2 are the players currently playing a match ---------------------

			let player1 = "Player 1";
			let player2 = "Player 2";
			let winner = 0;
			let tournamentWinner = 0;
			let index = 0;
			let aiDir = 0;
			let difficultyCoeff = 0.3;

			//---------- gameMode 0 => SOLO ---------- gameMode 1 => DUO ---------- gameMode 2 => TOURNAMENT

			let gameMode = 0;

			//---------- Matchmaking related variables -----------------------------------------------------

			let totalPoints = 0;
			let matchmakingIndex = 0;
			let foundPair = 0;
			let loopDirection = 0;

			//----------------------------------------------------------------------------------------------

			function resetWholeGame()
			{
				resetGame();
				player1 = "Player 1";
				player2 = "Player 2";
				winner = 0;
				tournamentWinner = 0;
				index = 0;
				gameMode = 1;
				totalPoints = 0;
				matchmakingIndex = 0;
				foundPair = 0;
				loopDirection = 0;
				playersCount = 1;
				players = [
				{name:"Player 1", score:0, alive:true},
				{name:"Player 2", score:0, alive:true},
				{name:"Player 3", score:0, alive:true},
				{name:"Player 4", score:0, alive:true},
				{name:"Player 5", score:0, alive:true},
				{name:"Player 6", score:0, alive:true},
				{name:"Player 7", score:0, alive:true},
				{name:"Player 8", score:0, alive:true}
			];
			}

			function resetGame()
			{
				x = canvas.width / 2;
				y = canvas.height - 10;
				dx = (canvas.width / 2) / 200;
				dy = -1 * ((canvas.height / 2) / 200);
				leftPaddle = (canvas.height - paddleHeight) / 2;
				rightPaddle = (canvas.height - paddleHeight) / 2;
				leftScore = 0;
				rightScore = 0;
				ballSpeed = canvas.width / 250;
				menuBool = true;
				aiDir = 0;
			}

			function drawMenu()
			{
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawStartSoloMenu();
				if (winner != 0)
					drawMenuScore();
				if (gameMode === 2 && tournamentWinner === 0)
					drawAnnouncementMenu();
			}

			function drawStartSoloMenu()
			{
				drawStartSoloMenuBox();
				if (boxHover === true)
					drawStartSoloMenuBoxHover();
				drawStartSoloMenuText();
			}

			function drawStartSoloMenuBox()
			{
				ctx.fillStyle = "#0095DD";
				ctx.beginPath();
				ctx.roundRect((canvas.width / 3), (canvas.height / 3), (canvas.width / 3), (canvas.height / 3), 50);
				ctx.fill();
				ctx.shadowBlur = 0;
			}

			function drawStartSoloMenuBoxHover()
			{
				ctx.fillStyle = "#0095DD";
				ctx.beginPath();
				ctx.roundRect((canvas.width / 3), (canvas.height / 3), (canvas.width / 3), (canvas.height / 3), 50);
				ctx.shadowColor = "#FFFFFF";
				ctx.shadowBlur = 50;
				ctx.fill();
			}

			function drawStartSoloMenuText()
			{
				ctx.font = canvas.height/6 + "px Arial";
				ctx.fillStyle = "#ffffff";
				ctx.textAlign="center";
				ctx.textBaseline = "middle";
				ctx.fillText(`PLAY`, canvas.width / 2, (canvas.height / 2));
			}

			function drawMenuScore()
			{
				ctx.font = canvas.height/10 + "px Arial";
				ctx.fillStyle = "#000000";
				ctx.textAlign="center";
				ctx.textBaseline = "middle";
				if (tournamentWinner === 0)
					ctx.fillText(`${winner} has won!`, canvas.width / 2, canvas.height / 6);
				else
				{
					ctx.font = canvas.height/15 + "px Arial";
					ctx.fillText(`${tournamentWinner} has won the tournament !`, canvas.width / 2, canvas.height / 6);
				}
			}

			/*function drawAnnouncementMenu()
			{
				ctx.font = canvas.height/10 + "px Arial";
				ctx.fillStyle = "#000000";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(`Next match ${player1} VS ${player2}`, canvas.width / 2, 5 * canvas.height / 6);
			}*/

			function drawAnnouncementMenu() {
				ctx.font = canvas.height / 12 + "px Arial";
				ctx.fillStyle = "#000000";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText("Next match", canvas.width / 2, 4.5 * canvas.height / 6);
				ctx.fillText(`${player1} VS ${player2}`, canvas.width / 2, 5.5 * canvas.height / 6);
			}


			function findNextMatch()
			{
				foundPair = 0;
				while (totalPoints < playersCount - 1)
				{
					while (matchmakingIndex < playersCount - 1 && foundPair < 2 && loopDirection === 0)
					{
						if (matchmakingIndex === playersCount - 2)
							loopDirection = 1;
						if (players[matchmakingIndex].alive === true && foundPair === 0)
						{
							player1 = players[matchmakingIndex].name;
							foundPair++;
							matchmakingIndex++;
						}
						else if (players[matchmakingIndex].alive === true && foundPair === 1 && players[matchmakingIndex].name != player1)
						{
							player2 = players[matchmakingIndex].name;
							foundPair++;
							matchmakingIndex++;
						}
						else
							matchmakingIndex++;
					}
					while (matchmakingIndex >= 0 && foundPair < 2 && loopDirection === 1)
					{
						if (matchmakingIndex === 0)
							loopDirection = 0;
						if (players[matchmakingIndex].alive === true && foundPair === 0)
						{
							player1 = players[matchmakingIndex].name;
							foundPair++;
							if (matchmakingIndex != 0)
								matchmakingIndex--;
						}
						else if (players[matchmakingIndex].alive === true && foundPair === 1 && players[matchmakingIndex].name != player1)
						{
							player2 = players[matchmakingIndex].name;
							foundPair++;
							if (matchmakingIndex != 0)
								matchmakingIndex--;
						}
						else
						{
							if (matchmakingIndex != 0)
								matchmakingIndex--;
						}
					}
					if (foundPair === 2)
						break ;
				}
			}

			function drawBall()
			{
				ctx.beginPath();
				ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}

			function predict()
			{
				let xPredict = x;
				let yPredict = y;
				let dxPredict = dx;
				let dyPredict = dy;
				time = new Date();
				if (time.getTime() - oldTime.getTime() >= 1000)
				{
					oldTime = new Date();
					if (dx > 0)
					{
						//Predicts where the ball hits the left Y axis
						while (xPredict + dxPredict < canvas.width - ballRadius - (paddleWidth / 2))
						{
							xPredict += dxPredict;
							yPredict += dyPredict;
							if (yPredict + dyPredict > canvas.height - ballRadius || yPredict + dyPredict < ballRadius)
								dyPredict = -dyPredict;
						}
						//Randomize the hit according to difficulty coefficient
						yPredict = yPredict + ((Math.random() * (difficultyCoeff - (-difficultyCoeff)) + (-difficultyCoeff)) * (paddleHeight / 2));
						//Calculate how many key strokes are needed to get the paddle to the Y index
						if (yPredict > rightPaddle + (paddleHeight / 2))
						{
							while (yPredict > rightPaddle + (paddleHeight / 2))
							{
								yPredict -= 7;
								aiDir--;
							}
						}
						else if (yPredict < rightPaddle + (paddleHeight / 2))
						{
							while (yPredict < rightPaddle + (paddleHeight / 2))
							{
								yPredict += 7;
								aiDir++;
							}
						}

					}
				}
			}

			function draw()
			{
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawBall();
				drawLeftPaddle();
				drawRightPaddle();
				drawScore();
				x += dx;
				y += dy;
				predict();
				if (aiDir < 0)
				{
					aiDir++;
					simulateKeyPress("ArrowDown");
				}
				else if (aiDir > 0)
				{
					aiDir--;
					simulateKeyPress("ArrowUp");
				}
				if (x + dx - (paddleWidth / 2) < ballRadius)
				{
					if (y > leftPaddle && y < leftPaddle + paddleHeight)
					{
						relativeIntersectionY = (leftPaddle + (paddleHeight / 2)) - y;
						normalizedIntersectionY = (relativeIntersectionY / (paddleHeight / 2));
						bounceAngle = normalizedIntersectionY * (5*Math.PI/12);
						if (ballSpeed < canvas.width / 100)
							ballSpeed += 0.2;
						dx = ballSpeed*Math.cos(bounceAngle);
						dy = ballSpeed*-Math.sin(bounceAngle);
					}
					else
					{
						rightScore++;
						if (rightScore === 3)
						{
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							clearInterval(interval);
							winner = player2;
							if (gameMode === 2)
							{
								totalPoints++;
								if (totalPoints === playersCount - 1)
									tournamentWinner = player2;
								index = 0;
								while (index < playersCount - 1)
								{
									if (player1.localeCompare(players[index].name) === 0)
										players[index].alive = false;
									if (player2.localeCompare(players[index].name) === 0)
										players[index].score++;
									index++;
								}
								findNextMatch();
							}
							resetGame();
							interval = setInterval(drawMenu, 10);
						}
						else
						{
							clearInterval(interval);
							interval = null;
							x = canvas.width / 2;
							y = canvas.height - 10;
							dx = -1 * (canvas.width / 2) / 200;
							dy = -1 * (canvas.height / 2) / 200;
							leftPaddle = (canvas.height - paddleHeight) /2;
							rightPaddle = (canvas.height - paddleHeight) /2;
							ballSpeed = canvas.width / 250;
							interval = setInterval(draw, 8);
						}
					}
				}
				else if (x + dx > canvas.width - ballRadius - (paddleWidth / 2))
				{
					if (y > rightPaddle && y < rightPaddle + paddleHeight)
					{
						relativeIntersectionY = (rightPaddle + (paddleHeight / 2)) - y;
						normalizedIntersectionY = (relativeIntersectionY / (paddleHeight / 2));
						bounceAngle = normalizedIntersectionY * (5*Math.PI/12);
						if (ballSpeed < canvas.width / 100)
							ballSpeed += 0.2;
						dx = -ballSpeed*Math.cos(bounceAngle);
						dy = ballSpeed*-Math.sin(bounceAngle);
					}
					else
					{
						leftScore++;
						if (leftScore === 3)
						{
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							clearInterval(interval);
							winner = player1;
							if (gameMode === 2)
							{
								totalPoints++;
								if (totalPoints === playersCount - 1)
									tournamentWinner = player1;
								index = 0;
								while (index < playersCount - 1)
								{
									if (player1.localeCompare(players[index].name) === 0)
										players[index].score++;
									if (player2.localeCompare(players[index].name) === 0)
										players[index].alive = false;
									index++;
								}
								findNextMatch();
							}
							resetGame();
							interval = setInterval(drawMenu, 10);
						}
						else
						{
							clearInterval(interval);
							interval = null;
							x = canvas.width / 2;
							y = canvas.height - 10;
							dx = (canvas.width / 2) / 200;
							dy = -1 * ((canvas.height / 2) / 200);
							leftPaddle = (canvas.height - paddleHeight) / 2;
							rightPaddle = (canvas.height - paddleHeight) / 2;
							ballSpeed = canvas.width / 250;
							interval = setInterval(draw, 8);
						}
					}
				}
				if (y + dy > canvas.height - ballRadius || y + dy < ballRadius)
					dy = -dy;

				if (leftPaddleDownPressed)
				{
					leftPaddle = Math.min(leftPaddle + 7, canvas.height - paddleHeight);
				}
				else if (leftPaddleUpPressed)
				{
					leftPaddle = Math.max(leftPaddle - 7, 0);
				}

				if (rightPaddleDownPressed)
				{
					rightPaddle = Math.min(rightPaddle + 7, canvas.height - paddleHeight);
				}
				else if (rightPaddleUpPressed)
				{
					rightPaddle = Math.max(rightPaddle - 7, 0);
				}
			}

			function drawLeftPaddle()
			{
				ctx.beginPath();
				ctx.rect(0, leftPaddle, paddleWidth, paddleHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}

			function drawRightPaddle()
			{
				ctx.beginPath();
				ctx.rect(canvas.width - paddleWidth, rightPaddle, paddleWidth, paddleHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}

			function drawScore()
			{
				ctx.font = "16px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.textAlign = "left";
				ctx.textBaseline = "left";
				ctx.fillText(`${player1}: ${leftScore}`, 8, 20);
				ctx.fillText(`${player2}: ${rightScore}`, 8, 40);
			}

			//---------- EVENT LISTENERS -------------------------------------------------------------------

			document.addEventListener("keydown", keyDownHandler, false);
			document.addEventListener("keyup", keyUpHandler, false);
			document.addEventListener("mousemove", mouseMoveHandler, false);
			document.addEventListener("click", mouseClickHandler, false);
			document.addEventListener("mousemove", function(e) {
    				const mousePos = getMousePos(canvas, e);
			});
			window.addEventListener( 'resize', onWindowResize, false );
			function onWindowResize() {
				navbarHeight = navbar.offsetHeight;
				canvas.height = window.innerHeight - navbarHeight;
				canvas.width = canvas.height * 3/2;
				paddleHeight = canvas.height / 4.5;
			}

			function simulateKeyPress(key) {
				// Simulate keydown event
				const keydownEvent = new KeyboardEvent('keydown', { key: key });
				document.dispatchEvent(keydownEvent);
				// Simulate keyup event after a short delay (for continuous pressing, you can adjust or skip this)
				setTimeout(() => {
					const keyupEvent = new KeyboardEvent('keyup', { key: key });
					document.dispatchEvent(keyupEvent);
				}, 8); // Delay in milliseconds, you can adjust as needed
			}

			function getMousePos(canvas, evt) {
    				// Get the bounding rectangle of the canvas
    				const rect = canvas.getBoundingClientRect();    
    				// Calculate mouse position within the canvas, accounting for scroll offset
    				const x = evt.clientX - rect.left;
				//+ window.scrollX;
    				const y = evt.clientY - rect.top;
				//+ window.scrollY;
    				return { x: x, y: y };
			}

			/*function mouseMoveHandler(e)
			{
				const relativeX = e.clientX - canvas.offsetLeft;
				const relativeY = e.clientY - canvas.offsetTop;

				if (relativeX > canvas.width/3 && relativeX < 2*canvas.width/3 && relativeY > canvas.height/3 && relativeY < 2*canvas.height/3)
				{
					boxHover = true;
				}
				else
				{
					boxHover = false;
				}
			}

			function mouseClickHandler(e)
			{
				const relativeX = e.clientX - canvas.offsetLeft;
				const relativeY = e.clientY - canvas.offsetTop;

				if (relativeX > canvas.width/3 && relativeX < 2*canvas.width/3 && relativeY > canvas.height/3 && relativeY < 2*canvas.height/3 && menuBool === true)
				{
					menuBool = false;
					winner = 0;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					clearInterval(interval);
					interval = setInterval(draw, 8);
				}
			}*/

			function mouseMoveHandler(e)
			{
				const mousePos = getMousePos(canvas, e);
				const relativeX = mousePos.x;
				const relativeY = mousePos.y;
				if (relativeX > canvas.width / 3 && relativeX < 2 * canvas.width / 3 && relativeY > canvas.height / 3 && relativeY < 2 * canvas.height / 3) {
        				boxHover = true;
				}
				else
				{
					boxHover = false;
				}
			}

			function mouseClickHandler(e)
			{
				const mousePos = getMousePos(canvas, e);
				const relativeX = mousePos.x;
				const relativeY = mousePos.y;
				if (relativeX > canvas.width / 3 && relativeX < 2 * canvas.width / 3 && relativeY > canvas.height / 3 && relativeY < 2 * canvas.height / 3 && menuBool === true && document.getElementsByClassName('content-game')[0].style.display === "block") {
					menuBool = false;
					winner = 0;
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					clearInterval(interval);
					interval = setInterval(draw, 8);
				}
			}


			function keyDownHandler(e)
			{
				if (e.key === "Up" || e.key === "ArrowUp")
				{
					e.preventDefault();
					if (gameMode != 0)
						rightPaddleUpPressed = true;
				}
				else if (e.key === "a" || e.key === "A")
				{
					leftPaddleUpPressed = true;
				}
				else if (e.key === "z" || e.key === "Z")
				{
					leftPaddleDownPressed = true;
				}
				else if (e.key === "Down" || e.key === "ArrowDown")
				{
					e.preventDefault();
					if (gameMode != 0)
						rightPaddleDownPressed = true;
				}
			}

			function keyUpHandler(e)
			{
				if ((e.key === "Up" || e.key === "ArrowUp") && gameMode != 0)
				{
					rightPaddleUpPressed = false;
				}
				else if (e.key === "a" || e.key === "A")
				{
					leftPaddleUpPressed = false;
				}
				else if (e.key === "z" || e.key === "Z")
				{
					leftPaddleDownPressed = false;
				}
				else if ((e.key === "Down" || e.key === "ArrowDown") && gameMode != 0)
				{
					rightPaddleDownPressed = false;
				}
			}
			interval = setInterval(drawMenu, 10);

			//---------- onClick functions for game mode ---------------------------------------------------

			function onClickEasy()
			{
				resetWholeGame();
				gameMode = 0;
				player1 = "Player 1";
				player2 = "Easy";
				difficultyCoeff = 0.3;
			};

			function onClickMedium()
			{
				resetWholeGame();
				gameMode = 0;
				player1 = "Player 1";
				player2 = "Medium";
				difficultyCoeff = 0.6;
			};

			function onClickHard()
			{
				resetWholeGame();
				gameMode = 0;
				player1 = "Player 1";
				player2 = "Hard";
				difficultyCoeff = 0.9;
			};

			function onClickDuo()
			{
				resetWholeGame();
				gameMode = 1;
			};

			function onClickTournament()
			{
				resetWholeGame();
				gameMode = 2;
			};
