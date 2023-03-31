//state of the board
const state = {
    gameBoard: [
        {id: 0, takenBy: ''},
        {id: 1, takenBy: ''},
        {id: 2, takenBy: ''},
        {id: 3, takenBy: ''},
        {id: 4, takenBy: ''},
        {id: 5, takenBy: ''},
        {id: 6, takenBy: ''},
        {id: 7, takenBy: ''},
        {id: 8, takenBy: ''}
    ],
    players: [
        {value: 'playerOne', name: '', isTurn: false},
        {value: 'playerTwo', name: '', isTurn: false}
    ],
    winConditions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    currentState: [[
        '','','',
        '','','',
        '','',''
    ]],
    playing: false
 };

 /********************************************* Phase One *********************************************/
/*************** Create all of the HTML elements using javascript to minize the HTML ***************/

const body = document.querySelector('body');

//create the h1 title
const gameName = document.createElement('h1');
gameName.id = 'gameName';
gameName.innerText = 'Tic Tac Toe';
body.appendChild(gameName);

//create the main section
const gameBoard = document.createElement('main');
gameBoard.id = 'gameBoard';
    //create the divs for each cell
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('id', `${i}`); //so each div element has an id that matches the index of a state.gameBoard object
        gameBoard.appendChild(cell);
    }
body.appendChild(gameBoard);

//create the player name input field
const playerNames = document.createElement('div');
playerNames.id = 'playerNames';
    //create input for player one name
    const playerOne = document.createElement('input');
    playerOne.type = 'text';
    playerOne.placeholder = 'Enter Player One Name';
    playerNames.appendChild(playerOne);
    //create input for player two name
    const playerTwo = document.createElement('input');
    playerTwo.type = 'text';
    playerTwo.placeholder = 'Enter Player Two Name';
    playerNames.appendChild(playerTwo);
body.appendChild(playerNames);

//create the action buttons
const actionButtons = document.createElement('div');
actionButtons.id = 'actionButtons';
    //create start game button element
    const startGameBttn = document.createElement('input');
    startGameBttn.type = 'button';
    startGameBttn.value = 'Start Game';
    actionButtons.appendChild(startGameBttn);
    //create reset board button element
    const resetButton = document.createElement('input');
    resetButton.type = 'button';
    resetButton.value = 'Reset Board';
    actionButtons.appendChild(resetButton);
body.appendChild(actionButtons);

//create p elements to display player names (will append after start button is clicked and input is valid)
const playerOneNameDisplay = document.createElement('p');
const versus = document.createElement('p');
const playerTwoNameDisplay = document.createElement('p');


//start functions
//Change the class name on the player input element (to determine whose turn it is)
function changeTurns() {
    
    if (playerOne.className === 'myTurn') {
        playerOne.className = 'notMyTurn';
        playerTwo.className = 'myTurn';
    } else {
        playerOne.className = 'myTurn';
        playerTwo.className = 'notMyTurn';
    }
}

//Randomly determine which player goes first
function determineFirstPlayer() {
    if ((Math.floor(Math.random() * 2)) === 0){ //generate a random number between 0 and 1 - if num is 0, player one goes first
        playerOne.className = 'myTurn';
    } else {
        playerTwo.className = 'myTurn';  
    };
}

function assignNames() {
    if (playerTwo.value === '') { //if player two is not assigned a name value => assign value 'Computer'
        playerTwo.value = 'Computer';
        state.players[0].name = `${playerOne.value}`;
        state.players[1].name = `${playerTwo.value}`;
    } else { //assign inputed players name's to players array in state object
        state.players[0].name = `${playerOne.value}`;
        state.players[1].name = `${playerTwo.value}`;
    };
}

//Display player names + hide the input boxes
function displayNames() {
    playerOne.style.visibility = 'hidden';
    playerOneNameDisplay.innerText = `${playerOne.value}`;
    playerNames.appendChild(playerOneNameDisplay);  

    versus.innerText = 'vs';
    playerNames.appendChild(versus);

    playerTwo.style.visibility = 'hidden';
    playerTwoNameDisplay.innerText = `${playerTwo.value}`;
    playerNames.appendChild(playerTwoNameDisplay);  

    //i chose to 'remove' the input boxes this way, because I didn't want their attributes to be removed with the remove() method, but I didn't want them to hold space on the screen if they weren't visible... if I could change it I would assign the attributes of playerOne & playerTwo to something that I could use while their names are displayed and then remove the element.. and create it again everytime someone hit reset board
    if (playerOne.style.visibility == 'hidden' || playerTwo.style.visibility == 'hidden') {
    playerOne.style.width = '0';
    playerOne.style.margin = '0';
    playerOne.style.padding = '0';

    playerTwo.style.width = '0';
    playerTwo.style.margin = '0';
    playerTwo.style.padding = '0';
    }
};

function computerMakeMove() {
    let rand = Math.floor(Math.random() * stateOfOptions.length);
    let test2 = document.getElementById(`${stateOfOptions[rand]}`); //get div
    //console.log('random number ' + rand);
    //console.log(stateOfOptions[rand]);
    if (state.gameBoard[stateOfOptions[rand]].takenBy) {
        computerMakeMove();
    } else {
        let num2 = stateOfOptions[rand];
        test2.innerText = 'o';
        state.gameBoard[stateOfOptions[rand]].takenBy = 'o';
        state.currentState[0][num2] = 'o';
        console.log('num2 is ' +num2);
        stateOfOptions.splice(rand, 1);
        console.log('state of options after splice 2 ');
        console.log(stateOfOptions);
        //changeTurns();
        console.log('p1 ' +playerOne.className)
    }
}

/********************************************** Phase Two **********************************************/
/*********************************** My Originall Work (before refactoring completely) ***********************************/

  //program the reset board button (in case you mess up and/or want to start over)
  resetButton.addEventListener('click', () => { 
    for (let i = 0; i < state.gameBoard.length; i++){
        state.gameBoard[i].takenBy = '';
        document.getElementById(`${i}`).innerText = '';
        playerOne.className = '';
        playerTwo.className = '';
        playerOne.value = '';
        playerTwo.value = '';
        state.playing = false;
        //below is all for the displayNames() function - so that the input boxes reappear
        playerOne.style.visibility = 'visible';
        playerTwo.style.visibility = 'visible';
        playerOne.style.width = '';
        playerOne.style.margin = '5px';
        playerOne.style.padding = '10px';
        playerTwo.style.width = '';
        playerTwo.style.margin = '5px';
        playerTwo.style.padding = '10px';
        playerOneNameDisplay.remove();
        versus.remove();
        playerTwoNameDisplay.remove();
    }});

//
let arrayOfOptions = [0,1,2,3,4,5,6,7,8];
let stateOfOptions = arrayOfOptions.slice();
let num;
//when the start game button is clicked
startGameBttn.addEventListener('click', () => { 

    if (playerOne.value === '' && playerTwo.value != '') { //if player did not input name => alert
        playerTwo.value = '';
        alert('You must be player one. Try again.');
    } else if (playerOne.value === '') {
        alert('Please enter your name');
    } else { //Do some things (see comments below)

        if (playerTwo.value === '') { //if player two is not assigned a name value => assign value 'Computer'
            playerTwo.value = 'Computer';
            state.players[1] = 'Computer';
        };

        //assign inputed players name's to players array in state object
        state.players[0] = `${playerOne.value}`;
        state.players[1] = `${playerTwo.value}`;

        //determineFirstPlayer();
        playerOne.className = 'myTurn';
        displayNames();

        if (playerTwo.value === 'Computer' && playerTwo.className === 'myTurn') {
            computerMakeMove();
            changeTurns();
            
            console.log('asd');
        } 
            
        gameBoard.addEventListener('click', (event) => { //populate the game board (and game state array) and change player turn after each valid move
            
            //find the matching id, and when found add x or o to object key {innerText: value} and div.innerText
            for (let i = 0; i < state.gameBoard.length; i++){ //loop through the state.gameBoard array of objects
                if ((playerOne.value === '') || (playerTwo.value === '')) return; //if player name value is blank => return (exit)
                //console.log('hi');
                //console.log('p1 ' +playerOne.className);
                if (state.gameBoard[i].id == event.target.getAttribute('id')) { //if it finds the matching div.id and gameBoard.id
                    if (state.gameBoard[i].takenBy != '') { //if already marked return (exit)
                        return;
                    //using an if statement to determine if it's player one's turn based on a class seemed easier than writing a function for it - then I can also create a Math.floor(rand 0 - 1) to randomly choose a player to go first. if 0 it will assign player one a class of 'my turn' and vice versa
                    } else if (playerOne.className === 'myTurn') { //if player one's turn add x & change turn
                            let test1 = document.getElementById(`${i}`);
                            test1.innerText = 'x';
                            state.gameBoard[i].takenBy = 'x';
                            state.currentState[0][i] = 'x';
                            event.target.innerText = 'x';
                            console.log('i ' + i);
                            num = stateOfOptions.indexOf(i);
                            console.log('num is ' +num);
                            stateOfOptions.splice(num, 1);
                            console.log('state of options after splice 1 ');
                            console.log(stateOfOptions);
                            //let rand = Math.floor(Math.random() * stateOfOptions.length);
                            //let test2 = document.getElementById(`${stateOfOptions[rand]}`); //get div
                            //console.log('random number ' + rand);
                            //console.log(stateOfOptions[rand]);
                            changeTurns();
                            //if (playerTwo.value === 'Computer') {
                                // if (!state.gameBoard[stateOfOptions[rand]].takenBy) {
                                //     let num2 = stateOfOptions[rand];
                                //     test2.innerText = 'o';
                                //     state.gameBoard[stateOfOptions[rand]].takenBy = 'o';
                                //     state.currentState[0][num2] = 'o';
                                //     console.log('num2 is ' +num2);
                                //     stateOfOptions.splice(rand, 1);
                                //     console.log('state of options after splice 2 ');
                                //     console.log(stateOfOptions);
                                //     changeTurns();
                                // } else {
                                    
                                // }
                             if (playerTwo.value === 'Computer') { //if player two's turn add o & change turn 
                                computerMakeMove();
                                changeTurns();
                             }   
                            //}     
                            console.log(state.gameBoard);
                            console.log(state.currentState[0]);
                     } else if (playerTwo.className === 'myTurn' && playerTwo.value != 'Computer') {
                        let test1 = document.getElementById(`${i}`);
                        test1.innerText = 'x';
                        state.gameBoard[i].takenBy = 'o';
                        state.currentState[0][i] = 'o';
                        event.target.innerText = 'o';
                        console.log('i ' + i);
                        num = stateOfOptions.indexOf(i);
                        console.log('num is ' +num);
                        stateOfOptions.splice(num, 1);
                        console.log('state of options after splice 1 ');
                        console.log(stateOfOptions);
                        changeTurns();
                     }
                 }
            }
    });
 }});
//      }
// //   });
  



                // } else if (playerOne.className === 'myTurn') {

                // } else if (playerTwo.value === 'Computer') {
                //     computerMakeMove();
                //     changeTurns();
                // } else {

                // }





  /******************************how i tried to move forward before scrapping everything and starting over 
   * comment out lines 208-233 to get this to work

            gameBoard.addEventListener('click', (event) => { //populate the game board (and game state array) and change player turn after each valid move
            
                //find the matching id, and when found add x or o to object key {innerText: value} and div.innerText
                for (let i = 0; i < state.gameBoard.length; i++){ //loop through the state.gameBoard array of objects
                     if ((playerOne.value === '') || (playerTwo.value === '')) return; //if player name value is blank => return (exit)
            
                     if (state.gameBoard[i].id == event.target.getAttribute('id')) { //if it finds the matching div.id and gameBoard.id
                         if (state.gameBoard[i].takenBy != '') { //if already marked return (exit)
                            return;
                        //using an if statement to determine if it's player one's turn based on a class seemed easier than writing a function for it - then I can also create a Math.floor(rand 0 - 1) to randomly choose a player to go first. if 0 it will assign player one a class of 'my turn' and vice versa
                        } else if (playerOne.className === 'myTurn') { //if player one's turn add x & change turn
                            state.gameBoard[i].innerText = 'x';
                            event.target.innerText = 'x';
                            changeTurns();
                        } else { //if player two's turn add o & change turn
                            if ((playerTwo.value === 'Computer')) {
                                for (let i = 0; i < state.gameBoard.length; i++){
                                    if (state.gameBoard[i].innerText === '') { //if space is blank
                                        state.gameBoard[i].innerText = 'o';
                                        event.target.innerText = 'o';
                                        changeTurns();
                                        } else { 
                                            state.gameBoard[i].innerText = 'o';
                                            event.target.innerText = 'o';
                                            changeTurns();
                                }
                            }
                        }
                }
            }
        }
    });
    }});
    */ 







/*****************************this is where I left off, basically redoing everything
 * comment out everything after phase one to get it to work

let arrayOfOptions = [0,1,2,3,4,5,6,7,8];
let stateOfOptions = arrayOfOptions.slice();
//console.log(stateOfOptions);
let num;
function populateCell(event) {
    for (let i = 0; i < state.gameBoard.length; i++) {
        if (state.gameBoard[i].id == event.target.getAttribute('id')) {
            let test1 = document.getElementById(`${i}`); //get div
            test1.innerText = 'x'; //populate cell at that div
            state.gameBoard[i].takenBy = 'x';
            state.currentState[0][i] = 'x';
            console.log('i ' + i);
            num = stateOfOptions.indexOf(i);
            console.log('num is ' +num);
            stateOfOptions.splice(num, 1);
            //
            console.log('state of options after splice 1 ');
            console.log(stateOfOptions);
            let rand = Math.floor(Math.random() * stateOfOptions.length);
            //

            console.log('random number ' + rand);
            console.log(stateOfOptions[rand]);
           // let num = stateOfOptions[rand]
            let test2 = document.getElementById(`${stateOfOptions[rand]}`); //get div


            if (!state.gameBoard[stateOfOptions[rand]].takenBy) {
                let num2 = stateOfOptions[rand];
                test2.innerText = 'o';
                state.gameBoard[stateOfOptions[rand]].takenBy = 'o';
                state.currentState[0][num2] = 'o';

                console.log('num2 is ' +num2);
                stateOfOptions.splice(rand, 1);
                console.log('state of options after splice 2 ');
                console.log(stateOfOptions);
            } 
        }

    }
    //
    console.log(state.gameBoard);
    console.log(state.currentState[0]);
    
}
gameBoard.addEventListener('click', populateCell);
*/







/********************work I started with Adam
 * to start over again, after phase one


let arrayOfOptions = [0,1,2,3,4,5,6,7,8];
let copyArray = [...arrayOfOptions];

function computerPlay() {
    let arr =[];
    for (let i = 0; i < copyArray.length; i++) {
        if its empty, push it to the array arr
        generate a random number
    }
}
 */
