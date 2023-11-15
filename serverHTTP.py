# To add a textbox and a send button to your Flask app and receive input from the 
# textbox in your Python file, you can use HTML forms. Here's an updated version 
# of your app.py file to include a simple form

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        # Get the input from the textbox
        user_input = request.form['user_input']
        print(user_input)
        return f'You entered: {user_input}'

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
    
