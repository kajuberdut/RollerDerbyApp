# Use Python 3.12 image
FROM python:3.12

RUN "HIGHER DOCKER FILE!!!!!!"

# Update the package list, install postgresql-client, and clean up
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Command to run the script
CMD python test.py; tail -f /dev/null