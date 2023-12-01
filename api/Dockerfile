FROM python:3.12

# Update the package list, install postgresql-client, and clean up
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY ./requirements.txt /app/requirements.txt

# Set the working directory in the container
WORKDIR /app

# Install the dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the rest of your app's source code from your host to your image filesystem.
COPY ./ /app/

# # Command to run the script
# CMD ["uvicorn", "src.main:api_app", "--host", "0.0.0.0", "--port", "80"]

CMD python /app/src/database.py; tail -f /dev/null