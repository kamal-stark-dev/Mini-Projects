#include <iostream>
using namespace std;

// XOR Cipher
string encrypt(string message, int key) {
  string encrypted = "";
  for (char ch: message) {
    encrypted += (char)((int)ch ^ key);
  }
  return encrypted;
}

string decrypt(string encrypted, int key) {
  return encrypt(encrypted, key);
}

int main(void) {
  string message = "hello world";
  // cout << "Enter your message: ";
  // cin >> message;

  int key = 67;
  string encrypted = encrypt(message, key);

  cout << "The encrypted message is: `" << encrypted << "`\n";

  cout << "The original message is: `" << decrypt(encrypted, key) << "`\n";

  return 0;
}
