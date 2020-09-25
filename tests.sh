#!/bin/bash

COOKIE_FILENAME="tmpcookie"
QUIET_MODE=1

if [ $# != 3 ]; then
	echo "Usage: ${0} URL EMAIL PASSWORD"
	exit 1
else
	HOST=${1}
	EMAIL=${2}
	PASSWORD=${3}
fi

if [ "${QUIET_MODE}" == 1 ]; then
	PIPE="/dev/null"
else
	PIPE="/dev/stdout"
fi

rm ${COOKIE_FILENAME} 2>/dev/null
# create cookie with csrf token
echo 'Creating login cookie...'
curl -sL "${HOST}/admin/signin" -c ${COOKIE_FILENAME} 1>${PIPE}
curl -sL "${HOST}/admin/api/session/signin" \
	-H 'Content-Type: application/json' \
	-b ${COOKIE_FILENAME} \
	--data-binary "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\"}" \
	-H "x-csrf-token: $(awk '{print $7}' ${COOKIE_FILENAME} | tail -n2 | head -n1)" \
	-c ${COOKIE_FILENAME} 1>${PIPE}

echo 'Testing xlsx datasets in ./tests/' && echo
for f in tests/*.xlsx; do
	echo "Testing file ${f}..."
	prefix=$(basename ${f} | cut -d _ -f1)
	dor=$(date +%Y-%m-%d)
	output=$(curl -sL "${HOST}/api/upload/create" \
			-F "file_upload=@${f}" \
			-b ${COOKIE_FILENAME} \
			| jq -r '.uploadedFile._id','.fieldsites[0]._id')
	id=$(echo ${output} | cut -d ' ' -f1)
	fieldsite=$(echo ${output} | cut -d ' ' -f2)
	curl -sL "${HOST}/api/upload/${id}/update?id=${id}&name=${prefix}&description=${prefix}&dateOfReading=${dor}&maxDurationHours=6&confidenceLevel=minDecay&fieldsite=${fieldsite}" \
		-b ${COOKIE_FILENAME} 1>${PIPE}
done

rm -rf ${COOKIE_FILENAME}
echo 'Done testing'
read -p 'Press return to continue...'
