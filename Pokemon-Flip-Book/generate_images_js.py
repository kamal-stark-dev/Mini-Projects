import os
import re

def update_js_file():
    # 1. Define folder and target js file
    image_folder = "./pokemons"
    js_file_path = "./script.js"

    # 2. Allowed image extensions
    valid_extentions = (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg")

    # 3. Check if images folder exists
    if not os.path.exists(image_folder):
        print(f"Error: the folder {image_folder} does not exists.")
        return

    # 4. Scan folder and collect image names
    image_files = [
        img for img in os.listdir(image_folder)
        if img.lower().endswith(valid_extentions)
    ]

    # 5. Format the array as a beautiful JS string
    formatted_array = "const imageNames = [\n"
    for img in image_files:
        formatted_array += f"   '{img}',\n"
    formatted_array += "];";

    # 6. Read and update the JS file automatically
    if os.path.exists(js_file_path):
        with open(js_file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Regex to find an existing const imageNames block and replace it
        pattern = r"const imageNames\s*=\s*\[[\s\S]*?];"

        if re.search(pattern, content):
            new_content = re.sub(pattern, formatted_array, content)
            print(f"Updated existing 'imageNames' array in {js_file_path}!")
        else:
            # If no imageNames array exists, then add one on top
            new_content = formatted_array + "\n\n" + content
            print(f"Added new 'imageNames' array to the top of {js_file_path}!")

        with open(js_file_path, "w", encoding="utf-8") as f:
            f.write(new_content + "\n")
    else:
        # If script.js doesn't exist, create it with the array
        with open(js_file_path, "w", encoding="utf-8") as f:
            f.write(formatted_array + "\n")
        print(f"Created {js_file_path} with the image array!")

if __name__ == "__main__":
    update_js_file()