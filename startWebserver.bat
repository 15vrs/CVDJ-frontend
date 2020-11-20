ECHO OFF

set pack1=0
set pack2=0
set pack3=0

FOR /F "tokens=* USEBACKQ delims=" %%G IN (`npm list -g`) DO (
  echo "%%G"|find "@angular/cli" >nul
  if NOT errorlevel 1 (set pack1=1)
  echo "%%G"|find "@angular-devkit/core" >nul
  if NOT errorlevel 1 (set pack2=1)
  echo "%%G"|find "localtunnel" >nul
  if NOT errorlevel 1 (set pack3=1)
)

if %pack1%==1 (echo Angular/cli is installed) else (echo Angular/cli is not installed)
if %pack2%==1 (echo Angular-devkit/core is installed) else (echo Angular-devkit/core is not installed)
if %pack3%==1 (echo Localtunnel is installed) else (echo Localtunnel is not installed)

if not %pack1%_%pack2%_%pack3%==1_1_1 (
	set /p Insta=Install missing packages [1-Yes]: 
	if %Insta%_%pack1%==1_0 (npm install @angular/cli)
	if %Insta%_%pack2%==1_0 (npm install @angular-devkit/core)
	if %Insta%_%pack3%==1_0 (npm install localtunnel)

	set pack1=0
	set pack2=0
	set pack3=0

	FOR /F "tokens=* USEBACKQ delims=" %%G IN (`npm list -g`) DO (
	  echo "%%G"|find "@angular/cli" >nul
	  if NOT errorlevel 1 (set pack1=1)
	  echo "%%G"|find "@angular-devkit/core" >nul
	  if NOT errorlevel 1 (set pack2=1)
	  echo "%%G"|find "localtunnel" >nul
	  if NOT errorlevel 1 (set pack3=1)
	)

	if not %pack1%_%pack2%_%pack3%==1_1_1 (
		echo Package Install Failed
		Pause
		exit /B
	)
)

set /p Port=Enter Port: 
ECHO Running On Port: %Port%, URL: https://cvdj.loca.lt/
start /min cmd /c "lt --port %Port% --subdomain cvdj"
ng serve --port %Port% --disable-host-check