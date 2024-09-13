import { blocks } from "./Blocks"

export class Game {
    constructor() {
        this.cols = 10
        this.rows = 15
        this.count = 0
        this.score = 0
        this.speed = 40
        this.gridSize = 32
        this.gameOver = false
        
        this.block = blocks.getBlock()
        this.piece = document.createElement("div")
        this.gridContainer = document.createElement("div")
        this.scoreContainer = document.createElement("span")
        this.gameBoard = document.getElementById("gameBoard")
        this.finalScore = document.getElementById("finalScore")
        this.helpBtn = document.querySelectorAll(".btn-help")
        this.helpBackBtn = document.querySelector(".btn-back")
        this.newGameBtn = document.querySelectorAll(".btn-new-game")

        this.help = document.querySelector(".help")
        this.welcome = document.querySelector(".welcome")
        this.gameOverModal = document.querySelector(".gameOver")

        this.grid = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => 0))

        this.block.position = {
            x: parseInt(this.cols / 2 - this.block.shape[0].length / 2),
            y: 0
        }


        this.piece.style.display = "grid"
        this.piece.style.position = "absolute"
        
        this.gridContainer.style.display = "grid"
        this.gridContainer.style.position = "absolute"

        this.scoreContainer.style.display = "grid"
        this.scoreContainer.style.position = "absolute"

        this.gridContainer.style.top = 0
        this.gridContainer.style.left = 0
        this.gridContainer.style.gridTemplateRows = `repeat(${this.rows}, ${this.gridSize}px)`
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.cols}, ${this.gridSize}px)`
        
        this.scoreContainer.style.top = 0
        this.scoreContainer.style.left = 0
        this.scoreContainer.style.color = "whitesmoke"
        this.scoreContainer.style.padding = ".5em"

        this.gameBoard.appendChild(this.piece)
        this.gameBoard.appendChild(this.gridContainer)
        this.gameBoard.appendChild(this.scoreContainer)

        this.newGameBtn.forEach(btn =>
            btn.onclick = () => {
                this.gameOver ?
                    this.gameOverModal.classList.add("hide") :
                    this.welcome.classList.add("hide")
                    
                this.resetGame()
            }
        )
        this.helpBtn.forEach(btn =>
            btn.onclick = () => {
                this.gameOver ?
                    this.gameOverModal.classList.add("hide") :
                    this.welcome.classList.add("hide")
        
                this.help.classList.remove("hide")
            }
        )
        this.helpBackBtn.onclick = () => {
            this.gameOver ?
                this.gameOverModal.classList.remove("hide") :
                this.welcome.classList.remove("hide")
        
            this.help.classList.add("hide")
        }
    }
    drawBlock() {
        this.piece.innerHTML = ""

        this.piece.style.top = `${this.block.position.y * this.gridSize}px`
        this.piece.style.left = `${this.block.position.x * this.gridSize}px`
        this.piece.style.gridTemplateRows = `repeat(${this.block.shape.length}, ${this.gridSize}px)`
        this.piece.style.gridTemplateColumns = `repeat(${this.block.shape[0].length}, ${this.gridSize}px)`
    
        this.block.shape.forEach(row =>
            row.forEach(col => {
                const div = document.createElement("div")
    
                if(col) {
                    div.style.border = ".05em solid #1e1e1e"
                    div.style.backgroundColor = this.block.color
                }
    
                this.piece.appendChild(div)
            })
        )        
    }
    drawGrid() {
        this.gridContainer.innerHTML = ""

        this.grid.forEach(row =>
            row.forEach(col => {
                const div = document.createElement("div")
    
                if(col) {
                    div.style.border = ".05em solid #1e1e1e"
                    div.style.backgroundColor = col
                }
    
                this.gridContainer.appendChild(div)
            })
        )
    }
    placeBlock() {
        this.block.shape.forEach((row, y) =>
            row.forEach((col, x) => {
                if(col)
                    this.grid[this.block.position.y + y][this.block.position.x + x] = this.block.color
            })
        )
    }
    collided() {
        for(let y = 0; y < this.block.shape.length; y++) {
            const row = this.block.shape[y]
            
            for(let x = 0; x < row.length; x++) {
                if(row[x] && this.grid[this.block.position.y + y] && this.grid[this.block.position.y + y][this.block.position.x + x])
                    return true
            }
        }
    }
    collision() {
        let left = null
        let right = null

        this.block.shape.forEach((row, y) =>
            row.forEach((col, x) => {
                if(col) {
                    if(this.grid[this.block.position.y + y] && this.grid[this.block.position.y + y][this.block.position.x + x - 1])
                        left = true
                    if(this.grid[this.block.position.y + y] && this.grid[this.block.position.y + y][this.block.position.x + x + 1])
                        right = true
                }
            })
        )

        return {
            left, right
        }
    }
    rotateBlock() {
        const oldShape = this.block.shape
        
        this.block.shape = this.block.shape[0].map((_, i) => this.block.shape.map(row => row[i])).reverse()

        if(this.collided() || this.block.shape[0].length + this.block.position.x > this.grid[0].length || this.block.shape.length + this.block.position.y > this.grid.length)
            this.block.shape = oldShape
    }
    deleteFullLine() {
        let newArray = []
        
        this.grid.forEach(row => {
            if(!row.every(el => el !== 0)) {
                newArray.push(row)
            }
            else {
                this.score += 100
                newArray.unshift(Array.from({ length: this.cols }, () => 0))
            }
        })

        this.grid = newArray
        this.scoreContainer.innerHTML = `Score: ${this.score}`
    }
    handleControl() {
        window.onkeydown = (e) => {
            switch(e.key) {
                case "ArrowLeft":
                    if(this.block.position.x > 0 && !this.collision().left) {
                        this.block.position.x--
                    }
                    break
                case "ArrowRight":
                    if(this.block.position.x + this.block.shape[0].length < this.cols && !this.collision().right)
                        this.block.position.x++
                    break
                case "ArrowUp":
                    this.rotateBlock()
                    break
                case "ArrowDown":
                    this.speed = 3
                    break
                default:
                    break
            }
        }

        window.onkeyup = (e) => {
            if(e.key == "ArrowDown") this.speed = 40
        }

        if(this.collision().left)
            this.collision().left = null
        if(this.collision().right)
            this.collision().right = null
    }
    resetGame() {
        this.score = 0
        this.count = 0
        this.gameOver = false
        this.block = blocks.getBlock()
        this.grid = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => 0))
        
        this.block.position = {
            x: parseInt(this.cols / 2 - this.block.shape[0].length / 2),
            y: 0
        }

        this.run()
    }
    run() {
        if(!this.gameOver) {
            this.drawGrid()
            this.handleControl()
            this.deleteFullLine()
    
            if(this.collided() || this.block.position.y + this.block.shape.length > this.rows) {
                this.block.position.y--
                try {
                    this.placeBlock()
                } catch(err) {
                    this.gameOver = true
                }
                
                this.block = blocks.getBlock()
                this.block.position = {
                    x: parseInt(this.cols / 2 - this.block.shape[0].length / 2),
                    y: 0
                }
            }
            else {
                this.drawBlock()    
            }
            
            if(this.count >= this.speed) {
                this.count = 0
                this.block.position.y++
            }
    
            this.count++

            if(this.score >= 2000)
                this.speed = 10
            else if(this.score >= 3000)
                this.speed = 5
            else if(this.scor3 >= 5000)
                this.speed = 1

            setTimeout(() => this.run(), 10)
        }
        else {
            this.finalScore.innerHTML = `Your score is ${this.score}.`
            this.gameOverModal.classList.remove("hide")
        }
    }
}