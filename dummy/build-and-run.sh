docker rmi -f eggplanet/gustavo
docker build -t eggplanet/gustavo .

cd ./dummy
docker rmi -f gustavo-dummy
docker rm -f gustavo-dummy
docker build -t gustavo-dummy .
docker run -p 4000:3000 --name gustavo-dummy gustavo-dummy

# docker stop gustavo-dummy
