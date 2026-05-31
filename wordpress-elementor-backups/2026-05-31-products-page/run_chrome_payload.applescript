set payloadPath to "/Users/joeyzhou/Documents/New project/check_truebase_category_integrated_live_payload.js"
set payloadCode to read POSIX file payloadPath as text
with timeout of 600 seconds
    tell application "Google Chrome"
        execute active tab of front window javascript payloadCode
    end tell
end timeout
