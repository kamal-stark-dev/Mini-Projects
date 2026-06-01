#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) 
{
  char *mode = "w";
  char *filename;

  if (argc == 2) 
  {
    filename = argv[1];
  }
  else if (argc == 3 && strcmp(argv[1], "-a") == 0)
  {
    mode = "a";
    filename = argv[2];
  }
  else 
  {
    fprintf(stderr, "Usage: %s [-a] FILE\n", argv[0]);
    return 1;
  }

  FILE *fp = fopen(filename, mode);

  if (!fp) 
  {
    perror("fopen");
    return 1;
  }
  
  int ch;
  while ((ch = getchar()) != EOF)
  {
    putchar(ch);
    putc(ch, fp);
  }

  fclose(fp);

  return 0;
}
