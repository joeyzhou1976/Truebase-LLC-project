set payloadPath to "/Users/joeyzhou/Documents/New project/test_truebase_sample_form_submit_payload.js"
set payloadCode to read POSIX file payloadPath as text
with timeout of 600 seconds
    tell application "Google Chrome"
        execute active tab of front window javascript payloadCode
    end tell
end timeout
