#include <iostream>
#include <fstream>
#include <sstream> // streams -> makes easier to parse
#include <string> // getline()
using namespace std;

int main(int argc, char* argv[]) {

    if (argc < 2) {
        cerr << "Incorrect usage.\nUsage: ./a.exe" << " <filename.type>\n";
        return 1;
    }

    string fileLocation = argv[1];

    ifstream myFile(fileLocation);
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
        // stringstream acts like cin but instead of reading from keyboard it reads from a string in memory
        string word;
        while (ss >> word) { // ss >> words (works same as `cin >> word` and keeps on reading word until space, tab or newline occurs).
            words++;
        }

        // using stringstream makes grabbing words easier
    }

    myFile.close();

    cout << "Characters Count: " << characters << "\n";
    cout << "Words Count: " << words << "\n";
    cout << "Lines Count: " << lines << "\n";

    return 0;
}

// Compile and run this file: `g++ .\word-counter.cpp; ./a.exe test.txt`
