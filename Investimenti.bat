@echo off
title Investimenti Desktop
where msedge >nul 2>&1
if %errorlevel%==0 (
    start msedge --app="file:///%~dp0index.html" --window-size=1200,850
    exit
)
where chrome >nul 2>&1
if %errorlevel%==0 (
    start chrome --app="file:///%~dp0index.html" --window-size=1200,850
    exit
)
start "" "%~dp0index.html"
