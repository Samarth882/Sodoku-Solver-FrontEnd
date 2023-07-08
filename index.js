var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board);
};

function isvalid(grid,row,col,val){
    
    for(let i=0;i<9;i++){
        
        if(grid[i][col]==val) return false;
        if(grid[row][i]==val) return false;
        // if(grid[3*(row/3)+i/3][3*(col/3)+i%3] == val) return false;
        if (grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == val) return false;

        
    }
    return true;
    
}
function SudokuSolver(board)  
{ 
        
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(board[i][j]==0){
                    for(let c=1;c<=9;c++){
                        if(isvalid(board,i,j,c)){
                            board[i][j]=c;
                            if(SudokuSolver(board)) return true;
                            else board[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        FillBoard(board)
        return true;
    }
