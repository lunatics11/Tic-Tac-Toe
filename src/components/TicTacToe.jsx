import React, { useState ,useRef} from "react";
import "./style.css";
import circle_icon from  "../assets/circle.png";
import cross_icon from  "../assets/cross.png";
let data = ["","","","","","","","",""];
function TicTacToe() {
    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false);
    let titleRef = useRef(null);import React, { useState, useEffect } from "react";
import "./style.css";

import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function TicTacToe(){

    const [gameMode,setGameMode] = useState(null);

    const [board,setBoard] = useState(Array(9).fill(""));

    const [isXTurn,setIsXTurn] = useState(true);

    const [winner,setWinner] = useState("");

    const [draw,setDraw] = useState(false);

    const [gameOver,setGameOver] = useState(false);



    const checkWinner = (currentBoard)=>{

        for(let pattern of winningPatterns){

            const [a,b,c] = pattern;

            if(
                currentBoard[a]!=="" &&
                currentBoard[a]===currentBoard[b] &&
                currentBoard[b]===currentBoard[c]
            ){
                setWinner(currentBoard[a]);
                setGameOver(true);
                return true;
            }
        }

        if(!currentBoard.includes("")){
            setDraw(true);
            setGameOver(true);
            return true;
        }

        return false;
    };

    const findBestMove = (currentBoard) => {

        // 1. Try to win
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            const cells = [currentBoard[a], currentBoard[b], currentBoard[c]];
    
            if (cells.filter(x => x === "o").length === 2 &&
                cells.includes("")) {
    
                if (currentBoard[a] === "") return a;
                if (currentBoard[b] === "") return b;
                if (currentBoard[c] === "") return c;
            }
        }
    
        // 2. Block player
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            const cells = [currentBoard[a], currentBoard[b], currentBoard[c]];
    
            if (cells.filter(x => x === "x").length === 2 &&
                cells.includes("")) {
    
                if (currentBoard[a] === "") return a;
                if (currentBoard[b] === "") return b;
                if (currentBoard[c] === "") return c;
            }
        }
    
        // 3. Take center
        if (currentBoard[4] === "") return 4;
    
        // 4. Take a random corner
        const corners = [0, 2, 6, 8].filter(i => currentBoard[i] === "");
    
        if (corners.length > 0) {
            return corners[Math.floor(Math.random() * corners.length)];
        }
    
        // 5. Take a random side
        const sides = [1, 3, 5, 7].filter(i => currentBoard[i] === "");
    
        if (sides.length > 0) {
            return sides[Math.floor(Math.random() * sides.length)];
        }
    
        return -1;
    };

    const handleClick = (index) => {

        if (board[index] !== "" || gameOver) return;
    
        if (gameMode === "computer" && !isXTurn) return;
    
        const newBoard = [...board];
    
        newBoard[index] = isXTurn ? "x" : "o";
    
        setBoard(newBoard);
    
        if (checkWinner(newBoard)) return;
    
        if (gameMode === "player") {
            setIsXTurn(!isXTurn);
        } else {
            setIsXTurn(false);
        }
    };



    useEffect(()=>{

        if(
            gameMode!=="computer" ||
            gameOver ||
            isXTurn
        ) return;

        const timer=setTimeout(()=>{

            const move = findBestMove(board);

            if (move === -1) return;

            const newBoard=[...board];

            newBoard[move]="o";

            setBoard(newBoard);

            if (!checkWinner(newBoard)) {

                setIsXTurn(true);
            
            }

        },500);

        return ()=>clearTimeout(timer);

    },[board,isXTurn,gameMode,gameOver]);



    const playAgain=()=>{

        setBoard(Array(9).fill(""));

        setWinner("");

        setDraw(false);

        setGameOver(false);

        setIsXTurn(true);
    };



    const reset=()=>{

        playAgain();

        setGameMode(null);
    };



    const startComputerGame=()=>{

        playAgain();

        setGameMode("computer");
    };



    const startPlayerGame=()=>{

        playAgain();

        setGameMode("player");
    };



    if(gameMode===null){

        return(

            <div className="Container">

                <h1 className="Title">
                    Tic Tac Toe
                </h1>

                <button
                    className="Btn"
                    onClick={startPlayerGame}
                >
                    Player vs Player
                </button>

                <button
                    className="Btn"
                    onClick={startComputerGame}
                >
                    Player vs Computer
                </button>

            </div>

        );
    }
    return (
        <div className="Container">

            <h1 className="Title">
                {gameMode === "player"
                    ? "Player vs Player"
                    : "Player vs Computer"}
            </h1>

            <div className="board">

                {board.map((cell, index) => (

                    <div
                        key={index}
                        className="boxes"
                        onClick={() => {

                            handleClick(index); 

                            }

                        }
                    >

                        {cell==="x" && (
                            <img
                                src={cross_icon}
                                alt="X"
                            />
                        )}

                        {cell==="o" && (
                            <img
                                src={circle_icon}
                                alt="O"
                            />
                        )}

                    </div>

                ))}

            </div>

            {!gameOver && (

                <h2 style={{color:"white"}}>

                    {gameMode==="player"
                        ? `${isXTurn ? "X" : "O"} Turn`
                        : isXTurn
                        ? "Your Turn"
                        : "Computer Thinking..."}

                </h2>

            )}

            {winner!=="" && (

                <h2 style={{color:"#00ff88"}}>

                    {gameMode==="computer"

                        ? winner==="x"

                            ? "You Win!"

                            : "Computer Wins!"

                        : `${winner.toUpperCase()} Wins!`

                    }

                </h2>

            )}

            {draw && (

                <h2 style={{color:"#ffd54f"}}>

                    Match Draw

                </h2>

            )}

            <button
                className="Btn"
                onClick={playAgain}
            >
                Play Again
            </button>

            <button
                className="Btn"
                onClick={reset}
            >
                Back to Menu
            </button>

        </div>
    );
}

export default TicTacToe;
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1,box2,box3,box4,box4,box5,box6,box7,box8,box9];
    const toggle = (e,num) => {
       if (lock) {
        return 0;
       }
       if(count%2===0){
         e.target.innerHTML= `<img src='${cross_icon}'>`;
         data[num]="x";
         setCount(++count);
       }
       else{
        e.target.innerHTML = `<img src='${circle_icon}'>`;
        data[num]="o";
        setCount(++count);
       }
       checkWin();
    }

    const checkWin = () => {
        if(data[0]===data[1] && data[1]===data[2] && data[2]!==""){
            won(data[2]);
        }
        else if(data[3]===data[4] && data[4]===data[5] && data[5]!==""){
            won(data[5]);
        }
        else if(data[6]===data[7] && data[7]===data[8] && data[8]!==""){
            won(data[8]);
        }
        else if(data[0]===data[3] && data[3]===data[6] && data[6]!==""){
            won(data[6]);
        }
        else if(data[1]===data[4] && data[4]===data[7] && data[7]!==""){
            won(data[7]);
        }
        else if(data[2]===data[5] && data[5]===data[8] && data[8]!==""){
            won(data[8]);
        }
        else if(data[0]===data[4] && data[4]===data[8] && data[8]!==""){
            won(data[8]);
        }
        else if(data[2]===data[4] && data[4]===data[6] && data[6]!==""){
            won(data[6]);
        }
    }

    const won = (winner) => {
        setLock(true);
        if(winner==="x"){
            titleRef.current.innerHTML = `Congratulations  <img src='${cross_icon}'/>  Wins`;
        }
        else{
            titleRef.current.innerHTML = `Congratulations  '<img src='${circle_icon}'>'  Wins`;
        }
    }

    const reset = () => {
        setLock(false);
        data=["","","","","","","","",""];
        titleRef.current.innerHTML = 'Tic Tac Toe';
        box_array.forEach((e)=>{
            e.current.innerHTML = "";
        })
    }
  return (
    <div className="Container">
    <div className="Title" ref={titleRef}>Tic Tac Toe</div>
    <div className="board">
      <div className="r1">
        <div className="boxes" ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
        <div className="boxes" ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
        <div className="boxes" ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
      </div>
      <div className="r2">
        <div className="boxes" ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
        <div className="boxes" ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
        <div className="boxes" ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
      </div>
      <div className="r3">
        <div className="boxes" ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
        <div className="boxes" ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
        <div className="boxes" ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
      </div>
    </div>
    <button className="Btn" onClick={()=>{reset()}}>Reset</button>
    </div>
   );
}

export default TicTacToe;
