#include <stdio.h>

// TODO: add option to write or append to a file using > or >> options. (this would change the entire structure of the program.)

int main(int argc, char *argv[]) {
  if (argc == 1) {
    // take standard input
    int c;
    while ( (c = getchar()) != EOF ) {
      putchar(c);
    }
  }
  else {
    FILE *fp[argc - 1];
    
    for (int i = 0; i < argc - 1; i++) {
      // open file 
      fp[i] = fopen(argv[i + 1], "r");

      if (fp[i] == NULL) {
        printf("cannot open file as index: %d.\n", i + 1);
        return -1;
      }
      
      // read from file 
      int c;
      while ( (c = getc(fp[i])) != EOF ) {
        putc(c, stdout);
      }

      // close the file 
      fclose(fp[i]);
    }
  }
  
  return 0;
}
