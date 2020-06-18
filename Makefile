ifndef EMAIL
$(error EMAIL env var not provided)
endif

ifndef PASSWORD
$(error PASSWORD env var not provided)
endif

all: node_modules pages.json
	cat pages.json | EMAIL=$(EMAIL) PASSWORD=$(PASSWORD) node ./index.js

node_modules:
	npm i

pages.json:
	EMAIL=$(EMAIL) PASSWORD=$(PASSWORD) node ./following.js > $@
