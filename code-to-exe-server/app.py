import os
import tempfile
from flask import Flask, request, send_file
from subprocess import run

app = Flask(__name__)

@app.route('/generate_exe', methods=['POST'])
def generate_exe():
    try:
        code = request.json['code']

        # Create a temporary directory to hold the Python code
        with tempfile.TemporaryDirectory() as tempdir:
            code_file_path = os.path.join(tempdir, 'script.py')

            # Save the user's code to the file
            with open(code_file_path, 'w') as code_file:
                code_file.write(code)

            # Use cx_Freeze to generate the .exe file
            run(['python', '-m', 'cxfreeze', code_file_path])

            # Provide download link for the generated .exe
            exe_path = os.path.join(tempdir, 'dist', 'script.exe')
            return send_file(exe_path, as_attachment=True)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)

