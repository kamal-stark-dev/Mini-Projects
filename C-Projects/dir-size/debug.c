#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <ftw.h>

uint64_t dirsize = 0;
uint64_t minsize = 50 * 1024 * 1024;

// remove " or \ from the end to make the path valid
void sanitize_path(char *path) {
  size_t len = strlen(path);

  while (len > 0 && (path[len - 1] == '"' || path[len - 1] == '\\')) {
    path[--len] = '\0';
  }
}

// converts bytes into relevant human readable format (eg. 4.3 MB, 1.2 GB, etc.)
static const char* humanReadableSize(uint64_t bytes) {
  char* suffix[] = {"B", "KB", "MB", "GB", "TB"};
  char len = sizeof(suffix) / sizeof(suffix[0]);

  int i = 0;
  double dblBytes = bytes;

  if (bytes > 1024) {
    for (i = 0; (bytes / 1024) > 0 && i < len - 1; i++, bytes /= 1024) {
      dblBytes = bytes / 1024.0;
    }
  }

  static char output[200];
  snprintf(output, sizeof(output), "%.2lf %s", dblBytes, suffix[i]);
  return output;
}

// add size of current file to dirsize
int add_size_to_total(const char *fpath, const struct stat *sb, int typeflag, struct FTW *ftwbuf) {
  off_t size = sb->st_size;
  if (size > minsize)
    printf("%s: %s\n", fpath, humanReadableSize((uint64_t) size));
  dirsize += size;
  return 0;
}

int main(int argc, char* argv[]) {
  if (argc != 2) {
    printf("Usage: %s <dirname>\n", argv[0]);
    exit(EXIT_FAILURE);
  }
  
  // 1. Getting directory name
  sanitize_path(argv[1]);
  char* dirname = argv[1];

  // nftw - new file tree walk (It visits every file and directory in a specified path and passes information about them to a custom callback function.)

  // 2. Recursively get size of each file inside the directory
  nftw(dirname, add_size_to_total, 20, 0);

  // 3. Print the total size 
  printf("Total Size: %s\n", humanReadableSize(dirsize));
  // printf("Size: %ld bytes\n", dirsize);

  return 0;
}
