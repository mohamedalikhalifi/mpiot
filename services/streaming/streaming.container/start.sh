echo "**************************RUNNING CONTAINER*****************************#"
sudo docker run -it -p 8000:8000 \
    --mount type=bind,source="$(pwd)/../service",target=/service \
    --mount type=bind,source="$(pwd)/../shared",target=/shared \
    ${PWD##*/} \
    /bin/bash