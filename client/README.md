

# Docker
Build docker image with something like:

`docker build -t my-org/hcj-starter-client .`

Run with:

`docker run -p 3000:3000 -v ``pwd``:/app my-org/hcj-starter-client`

This allows you to run the production build without rebuilding the image.
