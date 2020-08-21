FROM python:3.8.3-alpine

WORKDIR /usr/src/app/iot

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . . 

RUN pip install --upgrade pip

RUN pip install -r requirements.txt
