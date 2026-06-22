#include <stdio.h>

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <python_file>\n", argv[0]);
    return -1;
  }

  FILE* fp = fopen(argv[1], "r");
  if (fp == NULL) {
    printf("Can't open file.\n");
    return -1;
  }

  int c;
  while ((c = getc(fp)) != EOF) {
    if (c == '#') {
      while ((c = getc(fp)) != '\n')
        ;
      if (c == '\n')
        putchar('\n');
    }
    else {
      putchar(c);
    }
  }

  fclose(fp);

  return 0;
}
