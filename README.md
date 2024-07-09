# Frontend for LabBox

This is the frontend for the LabBox application written using React framework.

## Prerequisites

You will need to have Node installed, currently the application has been
developed with version 21.7.3. A `.mise.toml` file is provided if you use Mise
(Linux or Mac) to handle your setup of development tools

## Install dependencies

`cd` into the frontend directory. And install the dependencies with `node
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

## Setup Self signed SSL Cert

`https` is probably not setup on our development machine, so Vite is set up to
used self-signed certificates. You will need to generate a `cert.pem` and
`key.pem` file, using the following.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

This will generate the `cert.pem` and `key.pem` file, please make sure you run
this in the `frontend` directory.

## Host redirect

Because Auth0 does not allow skipping of user consent for `localhost` we need to
set up a suitable redirect in our `hosts` file. To do this, add the following
entry to you `hosts` file, usually located at `/etc/hosts` on Mac and Linux. You
will need to edit this file with admin rights (sudo).

```
127.0.0.1 labbox.ouh.mmmoxford.uk
```

## Running frontend

Use `npm run dev` to run the frontend. You will notice that the frontend runs on
`https://labbox.ouh.mmmoxford.uk:3000/`. If the 3000 TCP port is already in use
on your system you will need to edit the `vite.config.ts` file and choose
another port that is available on your system.