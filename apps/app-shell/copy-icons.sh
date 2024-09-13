#!/bin/bash

source_folder="libs/shared/icons/src/lib/svgs"
destination_folder="apps/app-shell/public/svg"

rm -rf "$destination_folder"/*

while IFS= read -r filename; do
    cp "$source_folder/${filename}.svg" "$destination_folder/"
done < apps/app-shell/icon.list.txt
