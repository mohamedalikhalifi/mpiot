FROM        balenalib/raspberry-pi:stretch

RUN         apt-get -y update

RUN         apt-get -y upgrade

COPY        dependencies.txt /

RUN         xargs -a dependencies.txt apt-get install -y

ENV         PATH="/usr/bin/cmake/bin:${PATH}"
      
RUN         rm -f /usr/bin/python && ln -s /usr/bin/python3 /usr/bin/python

WORKDIR     /service

COPY        requirements.txt /service/

RUN         apt install python3-pip
RUN         pip3 install --upgrade pip
RUN         pip3 install -r requirements.txt --extra-index-url https://www.piwheels.org/simple

# COPY        haarcascade_frontalface_default.xml /service/

# COPY        *.py /service/

# ENTRYPOINT  ["python3","recognition.py"]