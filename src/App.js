import React, {useState} from 'react';

//board grid style
const boardStyle = {
    width: '300px',
    height: '200px',
    display: 'grid',
    gridTemplate: 'repeat(4, 1fr) / repeat(4, 1fr)'
};

const playerTextStyle = {
    fontSize: '22px',
};

// makes the button
function ButtonLayout ({colour, onClick}) {
    return (//create button
        <button onClick = {onClick}>
            {
                colour
            }
        </button>
    );
}

//a function that calls the ButtonLayout function and maps the buttons created into a grid
function GameBoard ({buttons, onClick}) {
    return (
        <div style = {boardStyle}>
            {buttons.map((button,i) => {
                return <ButtonLayout key = {i} colour = {button} onClick = {() => onClick (i)} />
            })}
        </div>
    );
}

function checkWinner(buttonValue){
    //All winning moves horizontally and vertically
    const combinations =[
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15]
    ];

    //checks if the four buttons beside each other are the same value
    for (let i = 0; i < combinations.length; i++){
        const [x,y,z,r] = combinations[i];
        if (buttonValue[x] && buttonValue[x] === buttonValue [y] && buttonValue[x] === buttonValue [z] && buttonValue[x] === buttonValue[r]){
            return buttonValue[x];
        }
    }
    return null;
}

function App() {
    const [player, setPlayer] = useState(true);
    const [board, setBoard] = useState(Array(16).fill(null)); //array of 16 buttons in the board
    const gameWinner = checkWinner(board);

    function handleClick(x) {
        //creates a copy of the board
        const boardDuplicate = [...board];

        if (gameWinner || boardDuplicate[x]) {
            return;
        }

        //depending on the player's turn, it sets the value of the button to either red or yellow
        boardDuplicate[x] = player ? 'RED': 'YELLOW';

        //changes state of the board and player
        setBoard(boardDuplicate);
        setPlayer(!player);
    }

    return (
        //initializes the game (GameBoard) with the given parameters to make it interactive
        <>
            <GameBoard buttons = {board} onClick = {handleClick} />

            <div style = {playerTextStyle}>
                <p>
                    {
                        //checks if gameWinner is true, then stop the game and show who won, else if there is not a winner yet, display the current player's turn
                        gameWinner ? 'Winner: ' + gameWinner : 'Turn: ' + (player ? 'Player 1 (RED)' : 'Player 2 (YELLOW)')
                    }
                </p>
            </div>
            
        </>
    );
}

export default App;