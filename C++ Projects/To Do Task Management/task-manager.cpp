// Task Manager - Add, view and mark as complete your tasks.

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

#define TasksFile "tasks.txt"
#define CompletedTasksFile "completed.txt"

// function declarations
void addTask();
void showTasks(bool showCompleted = true);
void markComplete();
void clearTasks();

int main(void) {
    // Menu Loop - Lets the user choose an action until they quit.
    int choice;
    do {
        cout << "\nTo Do List - Menu\n\t1. Add task.\t2. View tasks.\t3. Mark as complete.\t4. Clear tasks\t5. Exit.\n>> Select an operation: ";
        cin >> choice;

        switch (choice) {
            case 1:
                addTask();
                break;
            case 2:
                showTasks();
                break;
            case 3:
                markComplete();
                break;
            case 4:
                clearTasks();
                break;
            case 5:
                cout << "\n***** ~ Ara Ara Sayonara ~ *****\n";
                break;
            default:
                cout << "\n***** Invalid Operation Selected. *****\n";
        }
    } while (choice != 5);

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

    myFile << newTask << "\n";
    myFile.close();
}

void showTasks(bool showCompleted) {
    ifstream myFile(TasksFile);
    if (!myFile) {
        cerr << "Unable to open tasks file.\n";
        return;
    }

    cout << "\nTo Do Tasks:\n";

    string buffer;
    int i = 1;
    // show to do tasks
    while (getline(myFile, buffer)) {
        cout << "    " << i << ". "  << buffer << "\n";
        i++;
    }
    if (i == 1) { // task list is empty
        cout << "    ***** The task list is empty. *****\n";
    }
    myFile.close();

    if (!showCompleted) return;

    cout << "\nCompleted Tasks:\n";

    ifstream completedTasks(CompletedTasksFile);
    if (!completedTasks) {
        cerr << "Error in opening completed tasks file.\n";
        return;
    }

    i = 1;
    // show completed tasks
    while (getline(completedTasks, buffer)) {
        cout << "    " << i << ". " << buffer << "\n";
        i++;
    }
    if (i == 1) {
        cout << "    ***** The task list is empty. *****\n";
    }
    completedTasks.close();
}

void markComplete() {
    int taskNumber;
    showTasks(false);
    cout << "\nSelect the task number of the task which you want to mark as complete: ";
    cin >> taskNumber;

    if (taskNumber <= 0) { // 0 or negative index is invalid
        cout << "Invalid task number provided.\n";
        return;
    }

    ifstream inFile(TasksFile);
    if (!inFile) {
        cerr << "Error in opening tasks file.\n";
        return;
    }

    int lineNumber = 0;
    vector<string> lines;
    string line, completedTask;
    bool foundCompletedTask = false;

    // store completedTask and all lines except completedTask
    while (getline(inFile, line)) {
        lineNumber++;
        if (lineNumber == taskNumber) {
            completedTask = line;
            foundCompletedTask = true;
            continue;
        }
        lines.push_back(line);
    }
    inFile.close();

    if (!foundCompletedTask) { // invalid taks number was provided
        cout << "Invalid task number provided.\n";
        return;
    }

    // rewrite new task list (completed task removed)
    ofstream outFile(TasksFile);
    if (!outFile) {
        cerr << "Error in removing task from tasks file.\n";
        return;
    }
    for (string& line: lines) {
        outFile << line << "\n";
    }
    outFile.close();

    // adding completed task to completedTasks file
    ofstream completedFile(CompletedTasksFile, ios::app);
    if (!completedFile) {
        cerr << "Error in adding task to completed file.\n";
        return;
    }

    completedFile << completedTask << "\n";
    completedFile.close();
}

void clearTasks() {
    ofstream tasks(TasksFile, ios::trunc); // trucates the file
    tasks.close();

    ofstream completedTasks(CompletedTasksFile, ios::trunc); // trucates the file
    completedTasks.close();

    cout << "\n***** All tasks removed successfully. *****\n";
}