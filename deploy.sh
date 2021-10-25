echo "Let's deploy the new frontend version"



uuid=$(uuidgen)
uuid=$(echo ${uuid//-/})
echo "Building docker image with tag: $uuid"
docker build -t andresgarcia29/evnt-app:$uuid .
docker push andresgarcia29/evnt-app:$uuid

ssh root@143.244.152.242 "docker container rm -f  $(docker ps -aq) && docker run -d -p 80:80 --name evnt-app andresgarcia29/evnt-app:$uuid"

rm -rf dist/
