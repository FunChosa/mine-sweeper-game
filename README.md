# Mine sweeper game

A classic Minesweeper game built with React and Vite.  This version features a 10x10 grid with 10 randomly placed mines.

## Project Setup

1. **Clone the repository:** `git clone https://github.com/FunChosa/mine-sweeper-game.git`
2. **Navigate to the project directory:** `cd mine-sweeper-game`
3. **Install dependencies:** `npm install`
4. **Start the development server:** `npm run dev`

## Features

* **Fixed Grid Size:**  A 10x10 game grid with 10 mines.
* **Random Mine Placement:** Mines are randomly distributed across the grid at the start of each game.
* **Flag Placement:** Right-click to place or remove flags marking suspected mine locations.
* **Game Over Condition:**  Clicking a mine immediately ends the game, displaying an alert. The game restarts automatically after a mine is hit.
* **No Scoring/Timing:** This version does not include a timer or score tracking.

## Technology Stack

* React: ^18.3.1
* Vite: ^5.4.10

## State Management

The application's state is managed using the `useState` hook.

## Gameplay

Left-click on a square to reveal its contents. If it's a mine, the game ends, and an alert will display. If it's not a mine, the number of adjacent mines will be displayed. Right-click to place or remove flags.

## Future Enhancements

* **Styling and Mobile Responsiveness:**  Improve the visual presentation and ensure the game is playable on mobile devices.
* **Difficulty Levels:** Add options for different grid sizes and mine counts (beginner, intermediate, expert).
* **Scoring and Timing:** Implement a timer to track game duration and a scoring system based on game completion time.

## Deployment

The application is deployed on Netlify: https://funchosa-mine-sweeper-game.netlify.app

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
