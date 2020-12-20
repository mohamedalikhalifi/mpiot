while [ ! -d '/service' ]; do
    sleep 10
done

cd /service
echo "staring  recogintion service"
python recognition.py
