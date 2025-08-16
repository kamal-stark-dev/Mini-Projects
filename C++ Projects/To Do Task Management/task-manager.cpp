// Task Manager - Add, view and mark as complete your tasks.

#include <iostream>
#include <fstream>
#include <string>
using namespace std;

#define TasksFile "tasks.txt"
#define CompletedTasksFile "completed.txt"

// Symbols -> ✓ | ✗ | ☐ | ☑

// function declarations
void addTask();
void viewTasks();
void markComplete();

int main(void) {
    // Menu Loop - Lets the user choose an action until they quit.
    int choice;
    do {
        cout << "\nTo Do List - Menu\n\t1. Add task.\t2. View tasks.\t3. Mark as complete.\t4. Exit.\n>> Select an operation: ";
        cin >> choice;

        switch (choice) {
            case 1:
                addTask();
                break;
            case 2:
                // viewTasks();
                break;
            case 3:
                // markComplete();
                break;
            case 4:
                cout << "\n***** ~ Ara Ara Sayonara ~ *****\n";
                break;
            default:
                cout << "\n***** Invalid Operation Selected. *****\n";
        }
    } while (choice != 4);

    return 0;
}

void addTask() {
    ofstream myFile(TasksFile, ios::app);
    if (!myFile.is_open()) {
        cerr << "There was an error in opening the file.\n";
        return;
    }

    string newTask;
    cout << "Enter new task: ";
    cin.ignore(); // clear leftover newline from previous input
    getline(cin, newTask); // used getline to include spaces as well

    myFile << "0 | " << newTask << "\n";
    myFile.close();
}