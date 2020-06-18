This is a little service that runs periodically to give strava kudos to people you follow.

![](./stravaKudos.png)

## Instalation

To run the service only once:

```
$ git clone git@github.com:drio/stravaKudos.git
$ cd stravaKudos
$ EMAIL=foo@bar.com PASSWORD=foobar make service/logs
```

Where EMAIL and PASSWORD contain your strava credentials.

If all that works, you can then install it as a service in a linux box (tested
on ubuntu 20.04):

```
$ cd stravaKudos
$ make service/install
$ make service/start
```

Make sure the software runs correctly as a service. Then if you want to start it
at boot time:

```
$ make service/start_at_boot
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
