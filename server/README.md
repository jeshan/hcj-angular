# Skeleton project for Swagger

# Docker
Build docker image with something like:

`docker build -t my-org/hcj-starter-server .`

Run with:

`docker run -p 10010:10010 -P -v ``pwd``:/app my-org/hcj-starter-server`

This allows you to make changes to source code without rebuilding the image.
