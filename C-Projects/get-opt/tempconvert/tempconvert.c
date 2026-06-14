#include <stdio.h>
#include <stdlib.h>
#include <getopt.h> // for getopt() 

double CtoF(double centigrate) {
  return (centigrate * (9.0 / 5.0)) + 32;
}

double FtoC(double fahrenheit) {
  return (fahrenheit - 32) * (5.0 / 9.0);
}

void print_usage() {
  printf("Usage: ./tempconvert.exe -c <temp> | -f <temp>\n");
  exit(-1);
}

int main(int argc, char *argv[]) {
  if (argc < 2) {
    print_usage();
  }

  struct option long_options[] = {
    {"centigrate", required_argument, NULL, 'c'},
    {"celsius", required_argument, NULL, 'c'},
    {"fahrenheit", required_argument, NULL, 'f'}
  };
  int option_index = 0;

  int option;
  while ( (option = getopt_long(argc, argv, "c:f:", long_options, &option_index)) != -1) {
    switch(option) {
      case 'c': {
        double centigrate = atof(optarg);
        printf("%.2lf centigrate is %.2lf fahrenheit.\n", centigrate, CtoF(centigrate));
        break;
      }
    
      case 'f': {
        double fahrenheit = atof(optarg);
        printf("%.2lf fahrenheit is %.2lf centigrate.\n", fahrenheit, FtoC(fahrenheit));
        break;
      }
    
      default:
        print_usage();
    }
  }

  return 0;
}
