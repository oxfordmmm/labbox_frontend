CA_CERT_DIR := ${HOME}/.local/share/caddy/pki/authorities/local
CADDY_DIR := caddy
CERT_PATH := ${CADDY_DIR}/self-signed-certs

run-caddy:
	cd ${CADDY_DIR} && sudo caddy run

gen-key:
	mkdir -p ${CERT_PATH}
	openssl genrsa -out ${CERT_PATH}/labbox.localhost.key 2048

gen-csr:
	mkdir -p ${CERT_PATH}
	openssl req -new -key ${CERT_PATH}/labbox.localhost.key -out ${CERT_PATH}/labbox.localhost.csr -config ${CADDY_DIR}/csr.conf

read-csr:
	openssl req -in ${CERT_PATH}/labbox.localhost.csr -text -noout

gen-cert: gen-key gen-csr
	mkdir -p ${CERT_PATH}
	openssl x509 -req -in ${CERT_PATH}/labbox.localhost.csr \
		-CA ${CA_CERT_DIR}/intermediate.crt \
		-CAkey ${CA_CERT_DIR}/intermediate.key \
		-CAcreateserial \
		-out ${CERT_PATH}/labbox.localhost.crt \
		-days 365 \
		-extensions req_ext \
		-extfile ${CADDY_DIR}/csr.conf

read-cert:
	openssl x509 -in ${CERT_PATH}/labbox.localhost.crt -noout -text

clean:
	find . -type f -name labbox.localhost.crt | xargs rm -rf
	find . -type f -name labbox.localhost.csr | xargs rm -rf
