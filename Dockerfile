FROM python:3.10-buster

RUN apt-get update && apt-get install netcat -y --no-install-recommends

RUN mkdir -p /opt/app
RUN mkdir -p /opt/pip_cache

#COPY ~/.pip_cache /opt/pip_cache/
COPY . /opt/app/
WORKDIR /opt/app
RUN pip install -r requirements.txt --cache-dir /opt/pip_cache

EXPOSE 8000

# copy entrypoint.sh
RUN chmod +x /opt/app/entrypoint.sh

# run entrypoint.sh
ENTRYPOINT ["/opt/app/entrypoint.sh"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
