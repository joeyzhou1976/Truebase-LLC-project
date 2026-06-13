set payloadPath to "/Users/joeyzhou/Documents/New project/verify_how_it_works_hero_replacement_payload.js"
set payloadCode to read POSIX file payloadPath as text
with timeout of 600 seconds
    tell application "Google Chrome" to execute active tab of front window javascript payloadCode
end timeout
