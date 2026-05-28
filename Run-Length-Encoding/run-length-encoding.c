#include <stdio.h>
#include <stdlib.h> // exit() call
#include <string.h>

#ifdef _WIN32
#include <fcntl.h>
#include <io.h>
#endif

void compress() 
{
  int curr_char = getchar();
  if (curr_char == EOF) return;

  int next_char;
  int len = 1;

  while ((next_char = getchar()) != EOF) 
  {
    if (next_char == curr_char) 
    {
      len++;
      if (len == 255) 
      {
        putchar(curr_char);
        putchar(255);
        len = 0;
      }
    }
    else 
    {
      // printf("%c%i ", curr_char, len);
      putchar(curr_char);
      putchar(len);

      // reset
      len = 1;
      curr_char = next_char;
    }
  }

  putchar(curr_char);
  putchar(len);
}

void decompress()
{
  while (1) 
  {
    int curr_char = getchar();
    if (curr_char == EOF) break;

    int len = getchar();
    if (len == EOF) break; // technically don't need it 
    
    for (int i = 0; i < len; i++) {
      putchar(curr_char);
    }
  } 
}

int main(int argc, char *argv[]) 
{
  #ifdef _WIN32
    _setmode(_fileno(stdin), _O_BINARY);
    _setmode(_fileno(stdout), _O_BINARY);
  #endif

  if (argc != 2) 
  {
    printf("Usage: %s [compress | decompress]\n", argv[0]);
    exit(-1);
  }
  
  if (!strcmp(argv[1], "compress"))
  {
    compress();
  }
  else if (!strcmp(argv[1], "decompress"))
  {
    decompress();
  }
  else 
  {
    printf("Usage: %s [compress | decompress]\n", argv[0]);
    exit(-1);
  }
  
  return 0;
}
