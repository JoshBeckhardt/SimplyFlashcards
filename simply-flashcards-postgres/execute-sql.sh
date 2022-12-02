#!/bin/sh

if [ -e next-sql-script.txt ]
then
  NEXT_SCRIPT_NUMBER=$(cat next-sql-script.txt)
  if [[ $NEXT_SCRIPT_NUMBER =~ ^[0-9]+$ ]]
  then
    if [[ $NEXT_SCRIPT_NUMBER =~ ^0.$ ]]
	then
	  echo "Replacing corrupted next-sql-script.txt..."
	  echo 0 > next-sql-script.txt
      NEXT_SCRIPT_NUMBER=0
	else
	  echo "Starting from ${NEXT_SCRIPT_NUMBER}.sql..."
	fi
  else
    echo "Replacing corrupted next-sql-script.txt..."
	echo 0 > next-sql-script.txt
    NEXT_SCRIPT_NUMBER=0
  fi
else
  echo "Creating next-sql-script.txt..."
  echo 0 > next-sql-script.txt
  NEXT_SCRIPT_NUMBER=0
fi

NEXT_SCRIPT_FILENAME=$(echo "${NEXT_SCRIPT_NUMBER}.sql")

while [ -e $NEXT_SCRIPT_FILENAME ]
do
  echo "Executing ${NEXT_SCRIPT_FILENAME}..."
  PGPASSWORD=uM94ExBNvjBf psql -U sfcadmin -d sfcdatabase -f $NEXT_SCRIPT_FILENAME
  echo "$NEXT_SCRIPT_FILENAME executed."
  ((NEXT_SCRIPT_NUMBER++))
  NEXT_SCRIPT_FILENAME=$(echo "${NEXT_SCRIPT_NUMBER}.sql")
done

echo "Saving next script number to next-sql-script.txt..."
echo $NEXT_SCRIPT_NUMBER > next-sql-script.txt
echo "Saved next script number to next-sql-script.txt."
