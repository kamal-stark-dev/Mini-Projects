#include <stdio.h>
#include <string.h>

/*
- Tee Command:
Usage: command | tee [OPTIONS] [FILE...]

ex: echo "Hello, World!" | tee log.txt

Options: -a for appending to file than overwrite

ex: echo "New log entry" | tee -a log.txt
*/

int main(int argc, char *argv[]) 
{
  if (argc != 2 && argc != 3) 
  {
    printf("Usage: command | %s [OPTIONS] [FILE]\n", argv[0]);
    return 1;
  }

  char *mode = "w";

  if (argc == 3) {
    if (strcmp(argv[1], "-a"))
    {
      mode = "a";
    }
    else 
    {
      fprintf(stderr, "Invalid option: %s\n", argv[1]);
      return 1;
    }
  }

  FILE *fp = fopen(argc == 2 ? argv[1] : argv[2], mode);

  char ch;
  while ((ch = getchar()) != EOF)
  {
    putchar(ch);

    putc(ch, fp);
  }

  fclose(fp);

  return 0;
}
