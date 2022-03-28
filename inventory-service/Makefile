APP = inventory-service

# Docker-specific targets 
local-docker-build:
	docker build -t localhost/$(APP):dev .

local-docker-run:
	docker run --rm -p 3002:3002 localhost/$(APP):dev



letscloud-docker-build:
	docker build -t letscloud/$(APP):dev .

letscloud-docker-push:
	docker image push letscloud/$(APP):dev

letscloud-docker-run:
	docker run --rm -p 3002:3002 letscloud/$(APP):dev
	