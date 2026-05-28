#include <stdio.h>
#include <stdlib.h> // for exit()

int main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Usage: %s <source_file> <dest_file>\n", argv[0]);
    exit(-1);
  } 

  FILE *source = fopen(argv[1], "rb");
  FILE *dest = fopen(argv[2], "wb");

  if (source == NULL || dest == NULL) {
    if (source != NULL) fclose(source);
    if (dest != NULL) fclose(dest);

    printf("Error opening file(s)!\n");
    exit(-1);
  }

  int ch;
  while ((ch = fgetc(source)) != EOF) {
    fputc(ch, dest);
  }

  fclose(source); 
  fclose(dest);

  printf("File copied successfully from %s to %s\n", argv[1], argv[2]);
  return 0;
}
