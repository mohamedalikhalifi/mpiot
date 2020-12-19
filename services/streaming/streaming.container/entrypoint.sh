while [ ! -d '/service' ]; do
    sleep 10
done

cd /service
echo "staring  streaming service"
python streaming.py

