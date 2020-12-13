echo "**************************RUNNING CONTAINER*****************************#"
sudo docker run -it \
    --device=/dev/vcsm \
    --device=/dev/vchiq \
    --device=/dev/video0 \
    --mount type=bind,source="$(pwd)/../service",target=/service \
    --mount type=bind,source="$(pwd)/../shared",target=/shared \
    ${PWD##*/} \
    /bin/bash