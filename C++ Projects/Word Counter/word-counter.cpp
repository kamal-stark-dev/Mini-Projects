#include <iostream>
#include <fstream>
#include <sstream> // streams -> makes easier to parse
#include <string> // getline()
using namespace std;

int main() {
    ifstream myFile("test.txt");
    if (!myFile) {
        cerr << "Error: Could not open file.\n";
        return 1;
    }

    int characters = 0, words = 0, lines = 0;
    string buffer;

    while (getline(myFile, buffer)) {
        lines++;
        characters += buffer.length() + 1; // +1 for newline

        stringstream ss(buffer);
        string word;
        while (ss >> word) { // repeatedly extract each word
            words++;
        }
    }

    myFile.close();

    cout << "Characters Count: " << characters << "\n";
    cout << "Words Count: " << words << "\n";
    cout << "Lines Count: " << lines << "\n";

    return 0;
}
