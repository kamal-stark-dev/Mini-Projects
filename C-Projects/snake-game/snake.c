#include <stdio.h>
#include <stdlib.h>
#include <conio.h> // kbhit() for keyboard input
#include <windows.h> // sleep() 
#include <time.h>

#define WIDTH 30
#define HEIGHT 20

int gameOver;
int x, y;
int fruitX, fruitY;
int score;

int tailX[100], tailY[100];
int nTail;

int speed = 60;

enum Direction {
  STOP = 0,
  LEFT,
  RIGHT,
  UP,
  DOWN
};
enum Direction dir;

void Setup() {
  gameOver = 0;
  dir = STOP;

  x = WIDTH / 2;
  y = HEIGHT / 2;

  fruitX = rand() % (WIDTH - 2) + 1;
  fruitY = rand() % (HEIGHT - 2) + 1;

  score = 0;
  nTail = 0;
}

void Draw() {
  system("cls");

  printf("Score: %d\n", score);

  for (int i = 0; i < WIDTH / 2 + 1; i++)
    printf("# ");
  printf("\n");

  for (int i = 0; i < HEIGHT; i++) {
    for (int j = 0; j < WIDTH; j++) {
      if (j == 0)
        printf("#");

      if (i == y && j == x)
        printf("O");
      else if (i == fruitY && j == fruitX)
        printf("*");
      else {
        int print = 0;
        for (int k = 0; k < nTail; k++) {
          if (tailX[k] == j && tailY[k] == i) {
            printf("o");
            print = 1;
          }
        }
        if (!print)
          printf(" ");
      }

      if (j == WIDTH - 1)
        printf("#");
    }
    printf("\n");
  }

  for (int i = 0; i < WIDTH / 2 + 1; i++) 
    printf("# ");
  printf("\n");

  printf("Use W A S D to move.\n");
}

void Input() {
  if (_kbhit()) {
    int ch = _getch();

    if (ch == 27) { // ESC to exit 
      gameOver = 1;
      return;
    }    

    if (ch == 0 || ch == 224) {
      ch = _getch();
      switch(ch) {
        case 75:
          if (dir != RIGHT)
            dir = LEFT;
          break;
        case 77:
          if (dir != LEFT)
            dir = RIGHT;
          break;
        case 72:
          if (dir != DOWN)
            dir = UP;
          break;
        case 80:
          if (dir != UP)
            dir = DOWN;
          break;
        case 'x':
          gameOver = 1;
          break;
      }
    }
  }
}

void Logic() {
  for (int i = nTail - 1; i > 0; i--) {
    tailX[i] = tailX[i - 1];
    tailY[i] = tailY[i - 1];
  }
  tailX[0] = x;
  tailY[0] = y;

  switch (dir) {
    case LEFT:
      x--;
      break;
    case RIGHT:
      x++;
      break;
    case UP:
      y--;
      break;
    case DOWN:
      y++;
      break;
    default:
      break;
  }

  // wall collision
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) 
    gameOver = 1;

  // tail collision 
  for (int i = 0; i < nTail; i++) {
    if (tailX[i] == x && tailY[i] == y)
      gameOver = 1;
  }

  // eat fruit 
  if (x == fruitX && y == fruitY) {
    score += 10;

    fruitX = rand() % WIDTH;
    fruitY = rand() % HEIGHT;

    nTail++;
  }
}

int main() {
  srand(time(NULL));

  Setup();

  while (!gameOver) {
    Draw();
    Input();
    Logic();
    Sleep(speed);
  }

  printf("\nGame Over!\n");
  printf("Final Score: %d\n", score);

  return 0;
}
