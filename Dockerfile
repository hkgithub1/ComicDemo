FROM python:3.10-buster

RUN apt-get update && apt-get install vim -y --no-install-recommends

RUN mkdir -p /opt/app
RUN mkdir -p /opt/pip_cache

#COPY ~/.pip_cache /opt/pip_cache/
COPY . /opt/app/
WORKDIR /opt/app
RUN pip install -r requirements.txt --cache-dir /opt/pip_cache

EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000

