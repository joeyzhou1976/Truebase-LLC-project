set payloadPath to "/Users/joeyzhou/Documents/New project/truebase_memorial_products_upload_payload.js"
set payloadCode to read POSIX file payloadPath as «class utf8»
tell application "Google Chrome"
    execute active tab of front window javascript payloadCode
end tell
