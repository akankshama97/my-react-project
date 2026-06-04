@echo off
for /f "delims=" %%F in ('call "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-prefix.js"') do (
  echo %%F
)
