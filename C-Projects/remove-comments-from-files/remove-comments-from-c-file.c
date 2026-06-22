#include <stdio.h>

int main(int argc, char *argv[]) {

  if (argc != 2) {
    printf("Usage: %s <c_file>\n", argv[0]);
    return -1;
  }

  FILE *fp = fopen(argv[1], "r");
  if (fp == NULL) {
    printf("Can't open file.\n");
    return -1;
  }

  int c, d;
  while ((c = getc(fp)) != EOF) {
    if (c == '/') {
      d = getc(fp);

      if (d == '/') {
        // ignore single line comment 
        while ((c = getc(fp)) != EOF && c != '\n') 
          ;
        if (c == '\n')
          putchar('\n');
      }
      else if (d == '*') {
        // ignore multi line comment 
        int prev = 0;
        while ((c = getc(fp)) != EOF) {
          if (prev == '*' && c == '/')
            break;
          prev = c;
        }
      }
      else {
        putchar('/');
        if (d != EOF) 
          putchar(d);
      }
    }
    else if (c == '"' || c == '\'') {
      // ignore "//string\n" -> is not a comment but a string so we need to ignore that
      int quote = c;
      putchar(c);

      while ((c = getc(fp)) != EOF) {
        putchar(c);

        if (c == '\\') {
          if ((c = getc(fp)) != EOF)
            putchar(c);
        }
        else if (c == quote)
          break;
      }
    }
    else {
      putchar(c);
    }
  }

  fclose(fp);

  return 0;
}
