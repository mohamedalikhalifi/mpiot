echo "**************************RUNNING CONTAINER*****************************#"
sudo docker run -it \
    --mount type=bind,source="$(pwd)/../service",target=/service \
    --mount type=bind,source="$(pwd)/../../shared",target=/shared \
    ${PWD##*/} \
    /bin/bash