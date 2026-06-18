# cat command:

`cat` (short for *concatenate*) command is one of the most frequently used in Linux and Unix-like OS (iOS). It is primarly used to read, display, and combine text files directly from the terminal.

Common use cases:

1. *View file content*: display the entire text file on your screen.
```c 
cat filename.txt 
```

2. *Combine multiple files*: merges the contents of multiple text files sequentially.
```c 
cat file1.txt file2.txt 
```

3. *Create a new file*: allows you to type text directly into a new file from the terminal. (press `Ctrl + D` to save and exit)
```c 
cat > newfile.txt
```

4. *Merge and save to a file*: Uses `>` redirection operator to combine files into a brand new document.
```c 
cat file1.txt file2.txt > merged.txt 
```

5. *Append text*: Uses `>>` operator to add text or file contents to the end of an existing file without overwriting it.
```c 
cat file.txt >> existing_file.txt 
```


