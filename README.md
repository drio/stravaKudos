This is a little service that runs periodically to give strava kudos to people you follow.

![](./stravaKudos.png)

## Instalation

To run the service only once:

```
$ git clone git@github.com:drio/stravaKudos.git
$ cd stravaKudos
$ make

```

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
