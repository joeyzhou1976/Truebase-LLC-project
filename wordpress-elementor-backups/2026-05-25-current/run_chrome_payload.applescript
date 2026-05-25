set payloadPath to "/Users/joeyzhou/Documents/New project/inspect_partner_application_frontend_payload.js"
set payloadCode to read POSIX file payloadPath as «class utf8»
with timeout of 600 seconds
    tell application "Google Chrome"
        execute active tab of front window javascript payloadCode
    end tell
end timeout
