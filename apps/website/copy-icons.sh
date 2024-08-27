#!/bin/bash

source_folder="libs/shared/icons/src/lib/svgs"
destination_folder="apps/website/public/svg"

rm -rf "$destination_folder"/*

while IFS= read -r filename; do
    cp "$source_folder/${filename}.svg" "$destination_folder/"
done < apps/website/icon.list.txt
