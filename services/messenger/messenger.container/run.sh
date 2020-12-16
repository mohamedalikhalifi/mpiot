echo \
"##############################################################
# GET AND RUN REDIS                                          #
##############################################################"
sudo docker run --name ${PWD##*/} -d -p 127.0.0.1:6379:6379 --restart unless-stopped arm32v7/redis \
--appendonly yes --maxmemory 128mb --tcp-backlog 128