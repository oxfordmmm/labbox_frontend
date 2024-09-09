# Frontend for LabBox

This is the frontend for the LabBox application written using React framework.

## Prerequisites

You will need to have Node installed, currently the application has been
developed with version 21.7.3. A `.mise.toml` file is provided, if you use Mise
(Linux or Mac) to handle your setup of development tools.

## Install dependencies

`cd` into the frontend directory. And install the dependencies with `npm
install`.

## Setup environmental variables

Copy `.env.example` to `.env` and modify the `.env` file to include the relevant
setting for development. The structure of the `.env` is as follows:

```
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_CLIENT_SECRET=your-client-secret
REACT_APP_AUTH0_AUDIENCE=your-audience
```

Please make sure NOT to share or copy the `.env` file to any repos. An for
`.env` is includine in both the `.gitignore` and `.dockerignore` files for this
purpose

## Host redirect

Because Auth0 does not allow skipping of user consent for `localhost` we need to
set up a reverse proxy to enable https. One suitable tool for development work
is Caddy (https://caddyserver.com/docs/quick-starts/reverse-proxy). Once
installed use the following command to run the reverse proxy:

```shell
caddy reverse-proxy --from labbox.localhost --to labbox.localhost:3000
```

If you want to have trusted certificate, you can do the following step
```bash
# Generate a certificate signed by Caddy CA Intermediate cert
make gen-cert

# Make sure you have the dev server on port 3000, because Caddy is configured to forward traffic to this port
...

# Run caddy
make run-caddy

```

You will then need to add CA certificate to your browser. 
- Caddy Intermediate cert is usually located at `~/.local/share/caddy/pki/authorities/local/intermediate.crt`

For Chrome
- Open Chrome Settings:
  - Click the three vertical dots in the top-right corner of Chrome.
  - Select "Settings."

- Access Security Settings
    - Scroll down and click on "Privacy and security."
    - Click on "Security."

- Manage Certificates
    - Scroll down and click on "Manage certificates."

- Import Root Certificate:
    - In the "Certificate Manager" window, go to the "Authorities" tab.
    - Click "Import."
    - Navigate to the root certificate file located in `/.local/share/caddy/pki/authorities/local/intermediate.crt`.
    - Select the file and click "Open."

- Trust Certificate:
    - In the import dialog, make sure "Trust this CA to identify websites" is checked.
    - Click "OK" to complete the import.

For Firefox
- Open Firefox Settings:
    - Click the three horizontal lines in the top-right corner of Firefox.
    - Select "Settings."

- Access Privacy & Security Settings:
    - Click on "Privacy & Security" in the left sidebar.

- Manage Certificates:
    - Scroll down to the "Certificates" section.
    - Click on "View Certificates."

- Import Root Certificate:
    - In the "Certificate Manager" window, go to the "Authorities" tab.
    - Click "Import."
    - Navigate to the root certificate file located in `~/.local/share/caddy/pki/authorities/local/intermediate.crt`.
    - Select the file and click "Open."

- Trust Certificate:
    - In the import dialog, check the boxes for "Trust this CA to identify websites."
    - Click "OK" to complete the import.

## Running frontend

Use `npm run dev` to run the frontend. You will notice that the frontend runs on
`http://localhost:3000/`. If the 3000 TCP port is already in use on your system
you will need to edit the `vite.config.ts` file and choose another port that is
available on your system and change the reverse proxy command.

To access the frontend, point you web browser at https://labbox.localhost/
alternately use the VS Code launch `Launch Chrome against labbox.localhost`.

## Docker

A `Dockerfile` is provided that is used with the GitHub actions to build and
public the container to the container repository https://ghcr.io. It is possible
to run the frontend in a docker container locally. This will also need the
backend to be running in a docker container with the docker network and names
set correctly. Use a command similar to the following to build the container
locally.

```shell
docker build -t labbox_frontend .
```

To run the docker container locally use the following command

```shell
docker run --env-file ./.env -p 3000:80 --name labbox_frontend --network labbox_network -d labbox_frontend
```

The `--name` and `--network` options are required, so the containers can
communicate.
