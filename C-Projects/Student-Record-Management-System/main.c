#include <stdio.h>
#include <stdbool.h>

typedef struct {
  int rollNo;
  char name[50];
  int age;
  float marks;
} Student;

#define STUDENT_DB "students.dat"

void addStudent() {
  Student student;

  printf("\nENTER THE DETAILS OF THE NEW STUDENT: \n\n");

  printf("Roll No: ");
  scanf("%d", &student.rollNo);

  printf("Name: ");
  scanf("%s", student.name); // don't need & sign here
  
  printf("Age: ");
  scanf("%d", &student.age);

  printf("Marks: ");
  scanf("%f", &student.marks);

  FILE *fp = fopen(STUDENT_DB, "ab");
  fwrite(&student, sizeof(Student), 1, fp);
  fclose(fp);
}

void viewStudents() {
  FILE *fp = fopen(STUDENT_DB, "rb");
  Student student;
  
  printf("+------------+----------------------+-------+------------+\n");
  printf("| %-10s | %-20s | %-5s | %-10s |\n", "Roll No.", "Name", "Age", "Marks");
  printf("+------------+----------------------+-------+------------+\n");
  while (fread(&student, sizeof(Student), 1, fp)) {
    printf("| %-10d | %-20.20s | %-5d | %-10.2f |\n", student.rollNo, student.name, student.age, student.marks);
  }
  printf("+------------+----------------------+-------+------------+\n");
  printf("\n");
  fclose(fp);
}

void searchStudent() {
  int searchRollNo;
  printf("Enter the Roll No. of the student you want to search: ");
  scanf("%d", &searchRollNo);

  FILE *fp = fopen(STUDENT_DB, "rb");
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

  Student student;
  bool found = false;

  while (fread(&student, sizeof(Student), 1, fp)) {
    if (student.rollNo == searchRollNo) {
      found = true; 
      Student updated_student;

      printf("\nENTER THE UPDATED DETAILS OF THE STUDENT: \n\n");

      printf("Roll No: ");
      scanf("%d", &updated_student.rollNo);

      printf("Name: ");
      scanf("%s", updated_student.name); // don't need & sign here

      printf("Age: ");
      scanf("%d", &updated_student.age);

      printf("Marks: ");
      scanf("%f", &updated_student.marks);
      
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
  FILE *copy_fp = fopen("temp.dat", "wb");

  Student student;
  bool found = false;
  while (fread(&student, sizeof(Student), 1, original_fp)) {
    if (student.rollNo == searchRollNo) continue;
    fwrite(&student, sizeof(Student), 1, copy_fp);
  }

  fclose(original_fp);
  fclose(copy_fp);

  // delete original data 
  remove(STUDENT_DB);

  // rename "temp.dat"
  rename("temp.dat", STUDENT_DB);
}

int main() {
  // main menu
  int choice;
  do {
    printf("==== Student Management System ====\n");
    printf("1. Add Student\n");
    printf("2. View Students\n");
    printf("3. Search Student\n");
    printf("4. Update Student\n");
    printf("5. Delete Student\n");
    printf("6. Exit\n");

    printf("\nEnter Choice: ");
    scanf("%d", &choice);

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
      printf("\nPLEASE ENTER A VALID CHOICE\n\n");
    }
  } while (choice != 6);
  

  return 0;
}
