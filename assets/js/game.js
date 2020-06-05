
const keyMap = {
    TOP: 38,
    RIGHT: 39,
    BOTTOM: 40,
    LEFT: 37,
};


const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const OBSTACLES_WIDTH = 20;

class Obstacle {
    constructor(element, positionX, positionY, width, height){

    this.element = element;
    //Position
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this._initializePosition();
    }

    _initializePosition(){
        this.element.style.left = `${positionX}px`;
        this.element.style.top = `${positionY}px`;
        this.element.style.height = `${height}px`;
    }

};

const obstacle1 = new Obstacle({
    element: document.querySelector('.obstacle:nth-child(2)'),
    positionX: 100,
    positionY: 0,
    width: OBSTACLES_WIDTH,
    height: 300
});

class Player {
    //The fact that we write this properties here is a new thing. Before they had to be written inside the constructor
    element = document.querySelector('.player');  //This is the square from DOM
    x = 0;               //This is the position of the element
    y = 0;

    constructor() {
        this._initMovement();  //This reference to the future instance (object) that will be created 
    }

    _initMovement() {
        document.addEventListener('keydown', this._handleMovement.bind(this));  // this listen the keyboard arrows
        //We add the .bind() method wich takes different arguments and the first is the context
        //So we use 'this' as context for .bind(). This method can change the execution context of the object from where the function in called
    }

    _handleMovement(event) {
        switch (event.keyCode) {
            case keyMap.TOP: {
                this._moveTop();
                break;
            }
            case keyMap.RIGHT: {
                this._moveRight();
                break;
            }
            case keyMap.BOTTOM: {
                this._moveBottom();
                break;
            }
            case keyMap.LEFT: {
                this._moveLeft();
                break;
            }
        }
    }

    _moveTop() {
        const newY = this.y - PLAYER_MOVE_STEP;
        
        if(this._isMoveInBoundaries(this.x, newY)){
            this.y = newY;
            this._updatePosition();
        }
    };

    _moveRight() {
        const newX = this.x + PLAYER_MOVE_STEP;  // We put it into the newX variable to be able to calculate the obstacles

        if(this._isMoveInBoundaries(newX, this.y)){ // We send parameter to avoid discrepancies between the coordinates of the board and of the DOM
            this.x = newX;
            this._updatePosition();
        }
    };
    
    _moveBottom() {
        const newY = this.y + PLAYER_MOVE_STEP;
        
        if(this._isMoveInBoundaries(this.x, newY)){
            this.y = newY;
            this._updatePosition();
        }
    };
    
    _moveLeft() {
        const newX = this.x - PLAYER_MOVE_STEP;

        if(this._isMoveInBoundaries(newX, this.y)){
            this.x = newX;
            this._updatePosition();
        }
    };
    
    _updatePosition() { //We create this for the repetitions
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    };

    //Define the limits of the frame
    _isMoveInBoundaries(x, y) { //we send parameters to this function to update the 
        if(y < 0){
            return false
        }
        
        if(x < 0){
            return false
        }
        
        if(x > MAP_WIDTH - PLAYER_WIDTH){
            return false
        }
        
        if(y > MAP_HEIGHT - PLAYER_HEIGHT){
            return false
        }

        return true
    }

};

const p1 = new Player();


//To do//
// 1.When the player hit an obstacle show 'you are dead'. Also create obstacles and avoid the passing;
// 2.When the player hit an obstacle reset position;
// 3.Player has 3 lives. Display them in the board and remember them. After the 3 lives finishes 'Game over';
// 4.(optional) try to create a dynamic scenario for the game