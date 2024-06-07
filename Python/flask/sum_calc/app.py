"""
Flask / Sum Calculator
2024.06.07
"""

from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Handle the root URL route and calculate the sum of two numbers.

    Returns:
        str: Rendered HTML template with the result if POST request, otherwise the form.
    """
    result = None
    if request.method == 'POST':
        try:
            num1 = float(request.form['num1'])
            num2 = float(request.form['num2'])
            result = num1 + num2
        except (ValueError, KeyError):
            result = 'Invalid input. Please enter valid numbers.'
    return render_template('index.html', result=result)

if __name__ == '__main__':
    # Run the Flask development server with debug mode enabled.
    app.run(debug=True)
