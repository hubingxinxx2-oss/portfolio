@echo off
setlocal
cd /d "%~dp0"

set "PORTABLE_NODE=..\..\work\tools\node\node-v20.20.2-win-x64\node.exe"
if not exist "%PORTABLE_NODE%" set "PORTABLE_NODE="

where node >nul 2>nul
if %errorlevel%==0 (
  set "NODE_BIN=node"
) else if defined PORTABLE_NODE (
  set "NODE_BIN=%PORTABLE_NODE%"
) else (
  echo [提示] 未检测到 Node.js，也未找到便携版 Node。
  echo 请先安装 Node.js 20+（https://nodejs.org），然后重新运行本脚本。
  pause
  exit /b 1
)

echo 正在启动开发服务器，预览地址：http://localhost:5173
echo 请保持此窗口开启，关闭窗口即停止服务。
if "%NODE_BIN%"=="node" (
  call npm run dev
) else (
  "%NODE_BIN%" "%~dp0node_modules\vite\bin\vite.js"
)
echo.
echo 服务已停止。
pause
endlocal
