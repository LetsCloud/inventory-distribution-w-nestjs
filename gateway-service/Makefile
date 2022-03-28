APP = gateway-service

# Docker-specific targets 
local-docker-build:
	docker build -t localhost/$(APP):dev .

local-docker-run:
	docker run --rm -p 3000:3000 localhost/$(APP):dev



letscloud-docker-build:
	docker build -t letscloud/$(APP):dev .

letscloud-docker-push:
	docker image push letscloud/$(APP):dev

letscloud-docker-run:
	docker run --rm -p 3000:3000 letscloud/$(APP):dev
	