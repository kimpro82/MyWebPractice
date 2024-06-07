"""
FastAPI / Sum Calculator
2024.06.07
"""

from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

app = FastAPI()

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    """
    Handle the root URL route with a GET request.

    Args:
        request (Request): The request object.

    Returns:
        HTMLResponse: Rendered HTML form template.
    """
    return templates.TemplateResponse("index.html", {"request": request, "result": None})

@app.post("/", response_class=HTMLResponse)
async def post_form(request: Request, num1: float = Form(...), num2: float = Form(...)):
    """
    Handle the root URL route with a POST request and calculate the sum of two numbers.

    Args:
        request (Request): The request object.
        num1 (float): The first number.
        num2 (float): The second number.

    Returns:
        HTMLResponse: Rendered HTML template with the result.
    """
    result = num1 + num2
    return templates.TemplateResponse("index.html", {"request": request, "result": result})

if __name__ == '__main__':
    import uvicorn
    # Run the FastAPI development server.
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
