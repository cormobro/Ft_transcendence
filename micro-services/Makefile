all: build

build:
	@docker-compose --file=docker-compose.yml up --build

fclean:
	@docker stop $(shell docker ps -qa)
	@docker rm $(shell docker ps -qa)
	@docker image rm -f $(shell docker images -qa)
	@docker volume rm $(shell docker volume ls -q)
	@docker network rm micro-services_app-network

prune:
	@docker system prune

re: fclean build

.PHONY: all build fclean re prune
