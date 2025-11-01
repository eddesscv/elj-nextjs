import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, User, Bot } from 'lucide-react';

interface TicTacToeGameProps {
  onBack: () => void;
}

type Player = 'X' | 'O' | null;
type Board = Player[];

export const TicTacToeGame: React.FC<TicTacToeGameProps> = ({ onBack }) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Board): Player | 'tie' | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    
    if (board.every(cell => cell !== null)) {
      return 'tie';
    }
    
    return null;
  };

  const makeMove = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateScore(gameResult);
    }
  };

  const computerMove = () => {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter(val => val !== null) as number[];

    if (availableMoves.length === 0 || winner) return;

    // Simple AI: try to win, then block, then random
    let move = findWinningMove(board, 'O') ?? 
               findWinningMove(board, 'X') ?? 
               availableMoves[Math.floor(Math.random() * availableMoves.length)];

    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);
    setIsPlayerTurn(true);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateScore(gameResult);
    }
  };

  const findWinningMove = (board: Board, player: Player): number | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const cells = [board[a], board[b], board[c]];
      
      if (cells.filter(cell => cell === player).length === 2 && 
          cells.filter(cell => cell === null).length === 1) {
        return combo[cells.indexOf(null)];
      }
    }
    return null;
  };

  const updateScore = (result: Player | 'tie') => {
    setScore(prev => ({
      ...prev,
      player: result === 'X' ? prev.player + 1 : prev.player,
      computer: result === 'O' ? prev.computer + 1 : prev.computer,
      ties: result === 'tie' ? prev.ties + 1 : prev.ties
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0, ties: 0 });
    resetGame();
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(computerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            ← Back to Games
          </button>
          <h1 className="text-4xl font-bold mb-4">🎯 Tic-Tac-Toe</h1>
          <p className="text-xl text-blue-100">Challenge the computer in this classic strategy game!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>You (X)</span>
                </div>
                <div className="text-center">
                  {winner ? (
                    winner === 'tie' ? (
                      <span className="text-yellow-300 font-bold">It's a Tie!</span>
                    ) : winner === 'X' ? (
                      <span className="text-green-300 font-bold">You Win! 🎉</span>
                    ) : (
                      <span className="text-red-300 font-bold">Computer Wins!</span>
                    )
                  ) : (
                    <span className={`font-bold ${isPlayerTurn ? 'text-green-300' : 'text-blue-300'}`}>
                      {isPlayerTurn ? 'Your Turn' : 'Computer\'s Turn'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <span>Computer (O)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto mb-6">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => makeMove(index)}
                    disabled={!!cell || !!winner || !isPlayerTurn}
                    className="aspect-square bg-white/20 hover:bg-white/30 disabled:hover:bg-white/20 rounded-lg flex items-center justify-center text-4xl font-bold transition-colors disabled:cursor-not-allowed"
                  >
                    {cell && (
                      <span className={cell === 'X' ? 'text-green-300' : 'text-blue-300'}>
                        {cell}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={resetGame}
                  className="bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Game
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Score
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    You
                  </span>
                  <span className="text-2xl font-bold text-green-300">{score.player}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    Computer
                  </span>
                  <span className="text-2xl font-bold text-blue-300">{score.computer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ties</span>
                  <span className="text-2xl font-bold text-yellow-300">{score.ties}</span>
                </div>
              </div>
              <button
                onClick={resetScore}
                className="w-full mt-4 bg-red-500/20 text-red-200 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Reset Score
              </button>
            </div>

            {/* Game Rules */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">How to Play</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• You are X, computer is O</li>
                <li>• Get 3 in a row to win</li>
                <li>• Rows, columns, or diagonals count</li>
                <li>• Click any empty square to make your move</li>
                <li>• Computer will move automatically</li>
              </ul>
            </div>

            {/* Strategy Tips */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Strategy Tips</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Start in the center or corner</li>
                <li>• Block opponent's winning moves</li>
                <li>• Create multiple winning opportunities</li>
                <li>• Control the center square</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};