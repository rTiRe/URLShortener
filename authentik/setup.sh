#!/bin/bash

# More safety, by turning some bugs into errors.
set -o errexit -o pipefail -o noclobber -o nounset

# ignore errexit with `&& true`
getopt --test > /dev/null && true
if [[ $? -ne 4 ]]; then
    echo 'I’m sorry, `getopt --test` failed in this environment.'
    exit 1
fi

# option --output/-o requires 1 argument
LONGOPTS=errorReporting,httpPort:,httpsPort:,downloadCompose
OPTIONS=rp:P:c

# -temporarily store output to be able to check for errors
# -activate quoting/enhanced mode (e.g. by writing out “--options”)
# -pass arguments only via   -- "$@"   to separate them correctly
# -if getopt fails, it complains itself to stderr
PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@") || exit 2
# read getopt’s output this way to handle the quoting right:
eval set -- "$PARSED"

ENV_FILENAME=.env

DOWNLOAD_COMPOSE=false
AUTHENTIK_ERROR_REPORTING__ENABLED=false
COMPOSE_PORT_HTTP=9000
COMPOSE_PORT_HTTPS=9443

while true; do
    case "$1" in
        -r|--errorReporting)
            AUTHENTIK_ERROR_REPORTING__ENABLED=true
            shift
            ;;
        -p|--httpPort)
            COMPOSE_PORT_HTTP="$2"
            shift 2
            ;;
        -P|--httpsPort)
            COMPOSE_PORT_HTTPS="$2"
            shift 2
            ;;
        -c|--downloadCompose)
            DOWNLOAD_COMPOSE=true
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Programming error"
            exit 3
            ;;
    esac
done

echo "PG_PASS=$(openssl rand -base64 36 | tr -d '\n')" >> $ENV_FILENAME
echo "AUTHENTIK_SECRET_KEY=$(openssl rand -base64 60 | tr -d '\n')" >> $ENV_FILENAME

# To enable error reporting, set variable value to true:
echo "" >> $ENV_FILENAME
echo "AUTHENTIK_ERROR_REPORTING__ENABLED=$AUTHENTIK_ERROR_REPORTING__ENABLED" >> $ENV_FILENAME

echo "" >> $ENV_FILENAME
echo "COMPOSE_PORT_HTTP=$COMPOSE_PORT_HTTP" >> $ENV_FILENAME
echo "COMPOSE_PORT_HTTPS=$COMPOSE_PORT_HTTPS" >> $ENV_FILENAME

echo "$ENV_FILENAME created. Now copy it to .env in project root directory and edit as needed."

# # SMTP Host Emails are sent to
# AUTHENTIK_EMAIL__HOST=localhost
# AUTHENTIK_EMAIL__PORT=25
# # Optionally authenticate (don't add quotation marks to your password)
# AUTHENTIK_EMAIL__USERNAME=
# AUTHENTIK_EMAIL__PASSWORD=
# # Use StartTLS
# AUTHENTIK_EMAIL__USE_TLS=false
# # Use SSL
# AUTHENTIK_EMAIL__USE_SSL=false
# AUTHENTIK_EMAIL__TIMEOUT=10
# # Email address authentik will send from, should have a correct @domain
# AUTHENTIK_EMAIL__FROM=authentik@localhost

if [ "$DOWNLOAD_COMPOSE" = true ] ; then
    echo "Downloading docker-compose.yml from https://goauthentik.io/docker-compose.yml"
    wget https://goauthentik.io/docker-compose.yml
    echo "Download complete. You can now run docker compose pull and docker compose up"
fi
