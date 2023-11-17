import os

# 获取当前脚本文件的路径
script_directory = os.path.dirname(__file__)

# 获取目录中后缀为 .html 的文件名，排除文件名为 "index.html"
html_files = [filename for filename in os.listdir(script_directory) if filename.endswith(".html") and filename != "index.html"]

# 创建一个包含文件名的数组（去除后缀）
file_names_array = [os.path.splitext(filename)[0] for filename in html_files]

# 输出数组内容
print("File names array:", file_names_array)

# 创建一个文本文件来存储文件名数组
output_file_path = os.path.join(script_directory, "file_names_array.txt")

# 将文件名数组写入文本文件，指定 utf-8 编码
with open(output_file_path, "w", encoding="utf-8") as output_file:
    output_file.write(str(file_names_array))

print("File names array written to:", output_file_path)
