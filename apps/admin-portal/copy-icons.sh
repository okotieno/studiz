#!/bin/bash

source_folder="libs/shared/icons/src/lib/svgs"
destination_folder="apps/admin-portal/public/svg"

rm -rf "$destination_folder"/*

while IFS= read -r filename; do
    cp "$source_folder/${filename}.svg" "$destination_folder/"
done < apps/admin-portal/icon.list.txt
