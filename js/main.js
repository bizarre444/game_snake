function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

var game = {
    size: 20,
    snake: [], 
    food: {},
    direction: {
        row: -1,
        col:0
    },
    createBoard: function() {
        console.log('create Board');
        var table = document.createElement('table');
        table.classList.add('game_table');

        for (var i = 0; i < this.size; i ++) {
            var tr = document.createElement('tr');

            for (var j = 0; j < this.size; j ++) {
                var td = document.createElement('td');
                td.classList.add('game_table_cell');
                td.setAttribute('id', 'cell-' + i + '-' + j);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        document.getElementById('snake_field').appendChild(table);
    },
    createSnake: function() {
        console.log('create Snake');
        this.snake.push({row: 10, col:10});
        this.snake.push({row: 11, col:10});

    },
    render: function() {
        var elements = document.getElementsByTagName('td');
        //console.log(elements);
        for ( var i = 0; i < elements.length; i ++) {
            elements[i].classList.remove('snake_unit');
            elements[i].classList.remove('food_unit');
        }

        for ( var i = 0; i < this.snake.length; i++ ) {
            var cell = this.snake[i];
            var id ='cell-' + cell.row + '-' + cell.col;
            document.getElementById(id).classList.add('snake_unit');
        }

        if (this.food.row && this.food.col) {
            var id = 'cell-' + this.food.row + '-' + this.food.col;
            document.getElementById(id).classList.add('food_unit');
        }
    },
    isSnakeCell: function(row, col) {
        for (var i = 0; i < this.snake.length; i++) {
            var cell = this.snake[i];
            if (cell.row == row && cell.col == col) {
                 return true;
            }
        }
        return false; 
    },
    createFood: function() {
        console.log('create Food');
        var pool = [];
        for (var i = 0; i < this.size; i ++) {
            for (var j = 0; j < this.size; j ++) {
                if (!this.isSnakeCell(i,j)){
                    pool.push({row: i, col: j});
                }
            }
        }

        var index = random(0, pool.length);
        this.food = pool[index];
    },
    setEvents: function() {
        this.intervalId = setInterval(this.move.bind(this), 500);
        document.addEventListener('keydown', this.changeDirection.bind(this));
    },
    changeDirection: function(e) {
        switch (e.keyCode) {
            case 37:
                this.direction = {
                    row: 0,
                    col: -1
                };
                break;
            case 38:
                this.direction = {
                    row: -1,
                    col: 0
                };
                break;
            case 39:
                this.direction = {
                    row: 0,
                    col: 1
                };
                break;
            case 40:
                this.direction = {
                    row: 1,
                    col: 0
                };
                break;
            default:
                break;
        }
    },
    checkCell: function(row, col) {
        if (row < 0 || row >= this.size || col < 0|| col >= this.size) {
            return false;
        }

        if (this.isSnakeCell(row, col)) {
            return false;
        }
        return true;
    },
    over: function() {
        alert('Game over!');
        clearInterval(this.intervalId);
    },
    move: function() {
        //console.log('move!');
        var row = this.snake[0].row + this.direction.row;
        var col = this.snake[0].col + this.direction.col;

        if(!this.checkCell(row, col)) {
            this.over();
        }

        this.snake.unshift({row: row, col: col}); //добавляем голову
        if (!this.food || this.food.row != row || this.food.col != col) {
            this.snake.pop();
        } else {
            this.createFood(); //еды нет, создаем новую
        }

        this.render();

    },
    run: function() {
        console.log('game run!');
        this.createBoard();
        this.createSnake();
        this.createFood();
        this.render();
        this.setEvents();
    }
};

window.addEventListener('load', function() {
    game.run();
});