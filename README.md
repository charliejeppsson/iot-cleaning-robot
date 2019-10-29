# iot-cleaning-robot

## Run app with Docker

- Make sure Docker Desktop is installed on your machine (includes Docker
  Compose, Docker Machine, Docker CLI and Docker Engine by default)
- `$ docker-compose up`
- `$ docker exec -it cleaning_robot_web bash` to run bash in server container
- `$ ./node_modules/.bin/sequelize db:migrate` to migrate the execution table
- Make plain GET request to http://localhost:5000/ to ask robot if everything is
  working
- Make POST request to http://localhost:5000/tibber-developer-test/enter-path
  with content-type header 'application/json' and body with format as below to
  make robot start cleaning office:

```json
{
  "start": {
    "x": 10,
    "y": 22
  },
  "commands": [
    {
      "direction": "east",
      "steps": 2
    },
    {
      "direction": "north",
      "steps": 1
    }
  ]
}
```
