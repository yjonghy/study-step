export function checkWinner(board, line)
{
    const black = "●"
    const white = "○"

    //line = 15

    //가로 방향 체크
    for (let index = 0; index < line; index++) {
        //최소 왼쪽, 오른쪽의 여분이 두개는 있어야한다
        //가로는 string 으로 바꾼후에 연속된 돌이 들어있으면 ok
        if ( board[index].join('').includes("●●●●●") ) {
            //["●","●","●","●","●","","","","","","","","","",""]
            return black;
            break
        }
        if ( board[index].join('').includes("○○○○○") ) {
            //["○","○","○","○","○","","","","","","","","","",""]
            return white;
            break
        }
    }


    for (let c = 2; c < line - 2; c++) {
        for (let r = 0; r < line; r++) {
            if (
                // 흑돌이 세로가 5개일 때 숭리
                //["","","","","●","","","","","","","","","",""]
                //["","","","","●","","","","","","","","","",""]
                //["","","","","●","","","","","","","","","",""]
                //["","","","","●","","","","","","","","","",""]
                //["","","","","●","","","","","","","","","",""]

                board[c - 2][r] === black &&
                board[c - 1][r] === black &&
                board[c][r] === black &&
                board[c + 1][r] === black &&
                board[c + 2][r] === black
            ) {
                return black;
                break;
            }
        }
    }

    for (let c = 2; c < line - 2; c++) {
        for (let r = 0; r < line; r++) {
            if (
                // 백돌이 세로가 5개일 때 승리
                board[c - 2][r] === white &&
                board[c - 1][r] === white &&
                board[c][r] === white &&
                board[c + 1][r] === white &&
                board[c + 2][r] === white
            ) {
                return board[c][r];
                break;
            }
        }
    }







    for (let c = 2; c < line - 2; c++) {
        for (let r = 2; r < line - 2; r++) {
            if (
                // 흑돌이 대각선 좌->우 5개일 때 숭리
                board[r - 2][c - 2] === black &&
                board[r - 1][c - 1] === black &&
                board[r][c] === black &&
                board[r + 1][c + 1] === black &&
                board[r + 2][c + 2] === black
            ) {
                return board[r][c];
                break;
            }
            if (
                // 흑돌이 대각선 우->좌 5개일 때 숭리
                board[r + 2][c - 2] === black &&
                board[r + 1][c - 1] === black &&
                board[r][c] === black &&
                board[r - 1][c + 1] === black &&
                board[r - 2][c + 2] === black
            ) {
                return board[r][c];
                break;
            }
        }
    }



    for (let c = 2; c < line - 2; c++) {
        for (let r = 2; r < line - 2; r++) {
            if (
                // 백돌이 대각선 좌->우 5개일 때 승리
                board[r - 2][c - 2] === white &&
                board[r - 1][c - 1] === white &&
                board[r][c] === white &&
                board[r + 1][c + 1] === white &&
                board[r + 2][c + 2] === white
            ) {
                return board[r][c];
                break;
            }
            if (
                // 백돌이 대각선 우->좌 5개일 때 승리
                board[r + 2][c - 2] === white &&
                board[r + 1][c - 1] === white &&
                board[r][c] === white &&
                board[r - 1][c + 1] === white &&
                board[r - 2][c + 2] === white
            ) {
                return board[r][c];
                break;
            }
        }
    }
}