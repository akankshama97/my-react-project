@echo off
for /f "delims=" %%F in ('echo hi') do (
  echo %%F
)
