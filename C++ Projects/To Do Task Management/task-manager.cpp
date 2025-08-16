// Task Manager - Add, view and mark as complete your tasks.

#include <iostream>
#include <fstream>
using namespace std;

int main(void) {
    // Menu Loop - Lets the user choose an action until they quit.
    int choice;
    do {
        cout << "\nTo Do List - Menu\n\t1. View tasks.\t2. Add task.\t3. Mark as complete.\t4. Exit.\n>> Select an operation: ";
        cin >> choice;

        switch (choice) {
            case 1:
                // showTasks();
                break;
            case 2:
                // addTask();
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