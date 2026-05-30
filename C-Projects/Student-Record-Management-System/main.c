#include <stdio.h>
#include <stdbool.h> // for bool 
#include <stdlib.h> // for EXIT_FAILURE
#include <string.h> // for strcspn

typedef struct {
  int rollNo; // unique
  char name[50];
  int age;
  float marks;
} Student;

#define STUDENT_DB "students.dat"

void init_database() {
  FILE *fp = fopen(STUDENT_DB, "ab"); // don't use "wb" as it'll delete overwrite the entire file
  if (fp) 
    fclose(fp);
}

void check_file(FILE* fp) {
  if (fp == NULL) {
    printf("ERROR: Error opening file.\n");
    exit(EXIT_FAILURE);
  }
}

void clearInputBuffer() {
  while (getchar() != '\n');
}

void addStudent() {
  Student student;

  printf("\nENTER THE DETAILS OF THE NEW STUDENT: \n\n");

  printf("Roll No: ");
  scanf("%d", &student.rollNo);

  FILE *fp = fopen(STUDENT_DB, "rb");
  check_file(fp);

  Student student_;
  while (fread(&student_, sizeof(Student), 1, fp)) {
    if (student_.rollNo == student.rollNo) {
      printf("\nERROR: Student already exists.\n\n");
      fclose(fp);
      return;
    }
  }

  fclose(fp);

  printf("Name: ");
  // scanf("%s", student.name);
  // scanf("%49s", student.name); // to prevent buffer overflow

  clearInputBuffer();
  fgets(student.name, sizeof(student.name), stdin);
  student.name[strcspn(student.name, "\n")] = '\0';
  
  printf("Age: ");
  scanf("%d", &student.age);
  if (student.age < 0 || student.age > 120) {
    printf("\nInvalid AGE.\n\n");
    return;
  }

  printf("Marks: ");
  scanf("%f", &student.marks);
  if (student.marks < 0 || student.marks > 100) {
    printf("\nInvalid MARKS.\n\n");
    return;
  }

  FILE *fwp = fopen(STUDENT_DB, "ab");
  check_file(fwp);
  fwrite(&student, sizeof(Student), 1, fwp);
  fclose(fwp);
}

void viewStudents() {
  FILE *fp = fopen(STUDENT_DB, "rb");
  check_file(fp);
  Student student;
  
  printf("+------------+----------------------+-------+------------+\n");
  printf("| %-10s | %-20s | %-5s | %-10s |\n", "Roll No.", "Name", "Age", "Marks");
  printf("+------------+----------------------+-------+------------+\n");

  int count = 0;
  while (fread(&student, sizeof(Student), 1, fp)) {
    printf("| %-10d | %-20.20s | %-5d | %-10.2f |\n", student.rollNo, student.name, student.age, student.marks);
    count++;
  }
  printf("+------------+----------------------+-------+------------+\n");
  printf("TOTAL STUDENTS: %d\n", count);
  fclose(fp);
}

void searchStudent() {
  int searchRollNo;
  printf("Enter the Roll No. of the student you want to search: ");
  scanf("%d", &searchRollNo);

  FILE *fp = fopen(STUDENT_DB, "rb");
  check_file(fp);
  Student student;
  bool found = false;

  while (fread(&student, sizeof(Student), 1, fp)) {
    if (student.rollNo == searchRollNo) {
      // student found    
      found = true;

      printf("+------------+----------------------+-------+------------+\n");
      printf("| %-10s | %-20s | %-5s | %-10s |\n", "Roll No.", "Name", "Age", "Marks");
      printf("+------------+----------------------+-------+------------+\n");
      printf("| %-10d | %-20.20s | %-5d | %-10.2f |\n", student.rollNo, student.name, student.age, student.marks);
      printf("+------------+----------------------+-------+------------+\n");
      printf("\n");
      
      break;
    }
  }

  if (!found) {
    printf("\n==== Student NOT Found!! ====\n\n");
  }

  fclose(fp);
}

void updateStudent() {
  int searchRollNo;
  printf("Enter the Roll No. of the student whose details you want to update: ");
  scanf("%d", &searchRollNo);

  FILE *fp = fopen(STUDENT_DB, "rb+"); // read & wirte both
  check_file(fp);

  Student student;
  bool found = false;

  while (fread(&student, sizeof(Student), 1, fp)) {
    if (student.rollNo == searchRollNo) {
      found = true; 
      Student updated_student;

      printf("\nENTER THE UPDATED DETAILS OF THE STUDENT: \n\n");

      printf("Roll No: ");
      scanf("%d", &updated_student.rollNo);

      FILE *frp = fopen(STUDENT_DB, "rb");
      check_file(frp);
      Student student_;

      while (fread(&student_, sizeof(Student), 1, frp)) {
        if (student_.rollNo == updated_student.rollNo && student_.rollNo != searchRollNo) { // the roll no. can't be one which already exists except itself
          printf("\nERROR: Student already exists.\n\n");
          fclose(frp);
          fclose(fp);
          return;
        }
      }

      fclose(frp);

      printf("Name: ");
      // scanf("%49s", updated_student.name); // to prevent buffer overflow
      
      clearInputBuffer();     
      fgets(updated_student.name, sizeof(updated_student.name), stdin);
      updated_student.name[strcspn(updated_student.name, "\n")] = '\0';

      printf("Age: ");
      scanf("%d", &updated_student.age);
      if (updated_student.age < 0 || updated_student.age > 120) {
        printf("\nInvalid AGE.\n\n");
        return;
      }

      printf("Marks: ");
      scanf("%f", &updated_student.marks);
      if (updated_student.marks < 0 || updated_student.marks > 100) {
        printf("\nInvalid MARKS.\n\n");
        return;
      }
      
      // move the pointer back
      fseek(fp, -(long)sizeof(Student), SEEK_CUR); // we type casted to long as sizeof is size_t by default (can't be negative)

      // overwirte the updated information
      fwrite(&updated_student, sizeof(Student), 1, fp);

      break;
    }
  }
  if (!found) {
    printf("There is no student whose Roll No. is %d.\n", searchRollNo);
  }
  else {
    printf("Student data updated successfully!!\n");
  }

  fclose(fp);
}

void deleteStudent() {
  // approach: copy all the students data one by one to a "temp.dat" file except the one we want to delete and then delete the original data and rename "temp.dat"
  
  int searchRollNo;
  printf("Enter the Roll No. of the student whose data you want to delete: ");
  scanf("%d", &searchRollNo);

  FILE *original_fp = fopen(STUDENT_DB, "rb");
  check_file(original_fp);

  FILE *copy_fp = fopen("temp.dat", "wb");
  check_file(copy_fp);

  Student student;
  bool found = false;
  while (fread(&student, sizeof(Student), 1, original_fp)) {
    if (student.rollNo == searchRollNo) {
      found = true;
      continue;
    }
    fwrite(&student, sizeof(Student), 1, copy_fp);
  }

  fclose(original_fp);
  fclose(copy_fp);

  // delete original data 
  if (remove(STUDENT_DB) != 0) {
    perror("remove");
  }

  // rename "temp.dat"
  if (rename("temp.dat", STUDENT_DB) != 0) {
    perror("rename");
  }
  

  if (!found) {
    printf("Student not found.\n");
  } 
  else {
    printf("Student deleted successfully.\n");
  }
}

int main() {
  
  printf("[==== Welcome to Student Management System ====]\n\n");

  init_database(); // create database file if it doesn't exist
  
  // main menu
  int choice;
  do {
    printf("1. Add Student\n");
    printf("2. View Students\n");
    printf("3. Search Student\n");
    printf("4. Update Student\n");
    printf("5. Delete Student\n");
    printf("6. Exit\n");

    printf("\nEnter Choice: ");
    // scanf("%d", &choice);

    if (scanf("%d", &choice) != 1) {
      printf("Invalid input.\n");

      while(getchar() != '\n');
      continue; // show the menu again
    }

    switch (choice) {
      case 1:
        addStudent();
      break;
      
      case 2:
        viewStudents();
      break;
      
      case 3:
        searchStudent();
      break;

      case 4:
        updateStudent();
      break;

      case 5:
        deleteStudent();
      break;

      case 6:
      break;

      default:
      printf("\nERROR: PLEASE ENTER A VALID CHOICE\n\n");
    }
  } while (choice != 6);

  printf("\n[==== THANKYOU FOR USING THE SERVICE ====]\n");  

  return 0;
}

/*
[--- UPGRADES ---]:

1. Check fwrite and fread for production-quality code:
```c
if (fwrite(&student, sizeof(Student), 1, fwp) != 1) {
    printf("Write failed.\n");
}
```
*/
