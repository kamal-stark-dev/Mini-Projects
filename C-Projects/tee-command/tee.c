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

  if (argc == 2) 
  {
    // write to the specified file 
    FILE *fp = fopen(argv[1], "w");

    int ch;
    while ((ch = getchar()) != EOF) 
    {
      putc(ch, fp);
    }

    fclose(fp);
  }

  else if (argc == 3) 
  {
    if (strcmp(argv[1], "-a") == 0) 
    {
      // append to the specified file 
      FILE *fp = fopen(argv[2], "a");

      int ch;
      while ((ch = getchar()) != EOF) 
      {
        putc(ch, fp);
      }

      fclose(fp);
    }
    else 
    {
      printf("Option: %s is not valid.\n", argv[1]);
      return 1;
    }
  }
}
