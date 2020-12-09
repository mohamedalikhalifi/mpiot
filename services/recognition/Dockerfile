FROM sgtwilko/rpi-raspbian-opencv

WORKDIR    /service
COPY       rpi_camera_surveillance_system.py /service/
RUN        chmod a+x rpi_camera_surveillance_system.py

ENTRYPOINT ["./rpi_camera_surveillance_system.py"]