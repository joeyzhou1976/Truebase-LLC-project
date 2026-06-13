set payloadPath to "/Users/joeyzhou/Documents/New project/export_truebase_public_safe_backup_payload.js"
set outputPath to "/Users/joeyzhou/Documents/New project/github-truebase-repo/wordpress-elementor-backups/2026-06-13-site-media-and-hero-update/wordpress-public-safe-export.json"
set payloadCode to read POSIX file payloadPath as text
do shell script "mkdir -p " & quoted form of "/Users/joeyzhou/Documents/New project/github-truebase-repo/wordpress-elementor-backups/2026-06-13-site-media-and-hero-update"
with timeout of 900 seconds
    tell application "Google Chrome"
        set backupJson to execute active tab of front window javascript payloadCode
    end tell
end timeout
set outputFile to open for access (POSIX file outputPath) with write permission
set eof of outputFile to 0
write backupJson to outputFile
close access outputFile
return "Wrote backup JSON to " & outputPath
