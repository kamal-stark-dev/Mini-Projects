#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <errno.h>

static char* format_bytes(uint64_t bytes) {
  static const char* suffixes[] = {"B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"};
  size_t len = sizeof(suffixes) / sizeof(suffixes[0]);

  double value = bytes;
  int i = 0;
  
  while (value >= 1024.0 && i < (int)len - 1) {
    value /= 1024.0;
    i++;
  }

  static char s[100];
  snprintf(s, sizeof(s), "%.2lf %s", value, suffixes[i]);
  return s;
}

int main(int argc, char* argv[]) {
  uint64_t bytes = 0;

  char buffer[100];

  if (argc == 1) {
    printf("Enter the number of bytes: ");
    scanf("%99s", buffer);
  }
  else if (argc == 2) {
    if ( snprintf(buffer, sizeof(buffer), "%s", argv[1]) >= sizeof(buffer) ) {
      fprintf(stderr, "Input too long.\n");
      exit(EXIT_FAILURE);
    }
  }
  else {
    printf("Usage: executable.exe | executable.exe <bytes>\n");
    exit(EXIT_FAILURE);
  }

  char *end;
  errno = 0;
  bytes = strtoull(buffer, &end, 10); // 10 is the base

  if (errno == ERANGE) {
    fprintf(stderr, "Number too large for uint64_t\n");
    exit(EXIT_FAILURE);
  }

  if (*end != '\0') {
    fprintf(stderr, "Invalid number: %s\n", buffer);
    exit(EXIT_FAILURE);
  }

  printf("%s", format_bytes(bytes));

  return 0;
}
