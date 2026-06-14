#include <stdio.h>
#include <getopt.h> // for getopt_long()
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
  char in_file[100], out_file[100];
  memset(in_file, 0, sizeof(in_file));
  memset(out_file, 0, sizeof(out_file));

  int opt;

  struct option long_options[] = {
    {"input-file", required_argument, NULL, 'i'},
    {"output-file", required_argument, NULL, 'o'},
    {0, 0, 0, 0} // mark the end of the structure
  };

  int options_index = 0;

  while ( (opt = getopt_long(argc, argv, "i:o:", long_options, &options_index)) != -1 ) {
    switch(opt) {
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

  printf("input = %s\n", in_file);
  printf("output = %s\n", out_file);

  if (optind < argc) {
    printf("non-option argv-elements: \n");
    while (optind < argc) {
      printf("%s | ", argv[optind++]);
    }
    printf("\n");
  }
}
