# Tetris Game

A fully functional Tetris game implemented using only HTML, CSS, and JavaScript with a clean hexagonal architecture.

## Features

- Classic Tetris gameplay with all 7 tetromino shapes (I, O, T, S, Z, J, L)
- Smooth piece movement and rotation
- Collision detection with walls and placed pieces
- Line clearing with scoring system
- Level progression with increasing speed
- Next piece preview
- Pause/Resume functionality
- Game over detection
- Responsive design

## Architecture

The project follows hexagonal architecture principles with clear separation of concerns:

### Domain Layer
Contains the core business logic and entities:
- **Value Objects**: Position, Shape, Color
- **Entities**: Tetromino, GameBoard
- **Services**: RotationService, CollisionService, LineClearService
- **Repositories**: GameRepository (interface)

### Application Layer
Contains application services and state management:
- **Services**: GameService, ScoreCalculator
- **State**: GameState

### Infrastructure Layer
Contains technical implementations:
- **Repositories**: InMemoryGameRepository
- **Renderers**: CanvasRenderer
- **Input**: KeyboardInputHandler

### Presentation Layer
Contains UI controllers:
- **Controllers**: GameController

## Controls

- **← →** - Move piece left/right
- **↑** - Rotate piece
- **↓** - Move piece down faster
- **Space** - Hard drop (instant drop)
- **P** - Pause/Resume game

## Scoring

- 1 line: 100 × level
- 2 lines: 300 × level
- 3 lines: 500 × level
- 4 lines (Tetris): 800 × level

## Testing

The project includes comprehensive unit tests using QUnit:

```bash
# Open tests in browser
open tests/index.html
```

Test coverage includes:
- Domain layer: Position, Shape, Color, Tetromino, GameBoard, and all services
- Application layer: ScoreCalculator, GameState, GameService

## Running the Game

Simply open `index.html` in a web browser:

```bash
open index.html
```

Or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve
```

Then navigate to `http://localhost:8000`

## Project Structure

```
tetris/
├── index.html                 # Main game HTML
├── style.css                  # Game styling
├── main.js                    # Entry point
├── domain/                    # Domain layer
│   ├── value-objects/
│   ├── entities/
│   ├── services/
│   └── repositories/
├── application/               # Application layer
├── infrastructure/            # Infrastructure layer
│   ├── repositories/
│   ├── renderers/
│   └── input/
├── presentation/              # Presentation layer
└── tests/                     # Unit tests
    ├── domain/
    └── application/
```

## Technologies Used

- **HTML5** - Structure and canvas elements
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Game logic and interactivity
- **QUnit** - Unit testing framework

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- HTML5 Canvas
- CSS Grid and Flexbox

## License

This project is open source and available for educational purposes.
