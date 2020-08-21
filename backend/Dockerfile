FROM python:3.8.3-alpine

WORKDIR /usr/src/app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . . 

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --upgrade pip

RUN pip install -r requirements.txt
