FROM python:3.12

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY ./ /app/

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]