@echo off
cd /d "%~dp0"
echo Killing any existing Python processes to clear conflicts...
taskkill /F /IM python.exe /T 2>nul

echo.
echo Starting Robo-Text-Book Backend...
echo ----------------------------------
echo Using Virtual Environment: backend\venv
echo.

REM using the absolute path to the venv python to avoid path issues
"backend\venv\Scripts\python.exe" -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start backend (Error Code: %ERRORLEVEL%)
    echo.
    echo Troubleshooting:
    echo 1. Ensure 'backend\venv' exists.
    echo 2. Try running 'pip install -r backend/requirements.txt' again.
    pause
)
