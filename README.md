This is a little service that runs periodically to give strava kudos to people you follow.

![](./stravaKudos.png)

## Instalation

To run the service only once:

```
$ git clone https://github.com/drio/stravaKudos.git
$ cd stravaKudos
# NOTE: Depending on your installation, you will have to install tons of dependency libraries.
# If you get a refined list for your apt-get command, please share it with me so I can add it to 
# my makefile and other users will benefit from it.
$ npm i
$ EMAIL=foo@bar.com PASSWORD=foobar make 

```

Where EMAIL and PASSWORD contain your strava credentials.

If all that works, you can then install it as a service in a linux box (tested
on ubuntu 20.04):

```
$ cd stravaKudos
$ rm -f ./strava_kudos.sh; EMAIL=foo@bar.com PASSWORD=foobar make service/install
$ EMAIL=foo@bar.com PASSWORD=foobar make service/start
```

Make sure the software runs correctly as a service. Then if you want to start it
at boot time:

```
$  EMAIL=foo@bar.com PASSWORD=foobar make service/start_at_boot
```

Notice the service will run every 15 minutes. If you want to change that, update line number 4 in the
`stravaKudos.sh.template` file.

When running as a service, you can check the output with:

```
$ EMAIL=foo@bar.com PASSWORD=foobar make service/logs
...
Jun 18 16:12:04 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/24861: no new activities
Jun 18 16:12:08 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/272905: no new activities
Jun 18 16:12:13 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/80387: no new activities
Jun 18 16:12:16 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/11611:👍
Jun 18 16:12:40 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/333469: no new activities
Jun 18 16:12:44 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/1162094: no new activities
Jun 18 16:12:50 aoi strava_kudos.sh[2045149]: - https://www.strava.com/athletes/1125703:👍
...
```

You can also look into your stravaKudos dir for the `run.log` and `errors.log`. The first one will show you the start and end times of each of the running instances. So you get an idea how long it takes to run. You can also use the `make service/logs` and check the last output line to see how many athletes stravaKudos processed. Chrominium generates a few exceptions when running the thumbsUp code so some athletes won't receive kudos until --hopefully-- the next run. Still trying to figure out what is going on there. PRs with fixes and improvements are welcome.

