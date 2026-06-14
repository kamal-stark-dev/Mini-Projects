#include <stdio.h>
#include <unistd.h> // includes getopt()
#include <stdbool.h>
#include <stdlib.h> // exit()
#include <string.h> // strcpy()

int main(int argc, char* argv[]) {
  printf("Hello, World!\n");

  char in_file[100] = "";
  char out_file[100] = "";
  bool has_a = false;

  int opt;
  while ( (opt = getopt(argc, argv, "ai:o:")) != -1 ) {
    switch(opt) {
      case 'a':
        has_a = true;
        break;
      case 'i':
        strcpy(in_file, optarg);  
        break;
      case 'o': 
        strcpy(out_file, optarg);  
        break;
      default:
        exit(-1);
    }
  }

  printf("has_a = %s\n", has_a ? "true" : "false");
  printf("infile = %s\noutfile = %s\n", in_file, out_file);
  
  return 0;
}
