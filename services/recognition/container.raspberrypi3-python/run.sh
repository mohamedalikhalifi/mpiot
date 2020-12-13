echo "**************************BUILDING CONTAINER****************************#"
sudo docker image build -t test .

echo "**************************RUNNING CONTAINER*****************************#"
sudo docker run -it -p 8000:8000 --device=/dev/vcsm  --device=/dev/vchiq --device=/dev/video0 --mount type=bind,source="$(pwd)",target=/service test /bin/bash