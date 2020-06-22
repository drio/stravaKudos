SERVICE_NAME=strava_kudos
PRJ_NAME=stravaKudos

ifdef IP
EMAIL=""
PASSWORD=""
PEM?=~drio/dev/my_vps/certificate.pem
REMOTE_USER=ubuntu
watch:
	watcher -startcmd \
	-cmd './rsync.sh $(IP) $(PEM) $(REMOTE_USER)' \
	-list \
	-ignore 'node_modules,.git'
endif

ifndef EMAIL
$(error EMAIL env var not provided)
endif

ifndef PASSWORD
$(error PASSWORD env var not provided)
endif

all: node_modules pages.json
	cat pages.json | EMAIL=$(EMAIL) PASSWORD=$(PASSWORD) node ./index.js

/usr/bin/node: /usr/bin/curl
	curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	sudo apt-get install nodejs libgbm1 -y
	node -v
	npm -v

node_modules:
	npm i

pages.json:
	EMAIL=$(EMAIL) PASSWORD=$(PASSWORD) node ./following.js > $@

.PHONY: service/install service/uninstall \
service/check service/start_at_boot \
service/start service/stop service/logs 

service/install: ./strava_kudos.sh
	sudo cp $(SERVICE_NAME).service /etc/systemd/system/$(SERVICE_NAME).service
	sudo systemctl daemon-reload

strava_kudos.sh: ./stravaKudos.sh.template
	cp $< $@
	chmod 755 $@
	sed -i -r 's/__EMAIL__/$(EMAIL)/' $@
	sed -i -r 's/__PASSWORD__/$(PASSWORD)/' $@

service/uninstall:
	sudo rm -f /etc/systemd/system/$(SERVICE_NAME).service
	sudo systemctl daemon-reload

service/check:
	@sudo systemctl is-enabled --quiet $(SERVICE_NAME) && echo enabled || echo disabled
	@sudo systemctl is-active --quiet $(SERVICE_NAME) && echo active || echo not-active

service/start_at_boot:
	sudo systemctl enable $(SERVICE_NAME)

service/start:
	sudo systemctl start $(SERVICE_NAME)

service/stop:
	sudo systemctl stop $(SERVICE_NAME)

service/logs:
	sudo journalctl -u $(SERVICE_NAME).service
