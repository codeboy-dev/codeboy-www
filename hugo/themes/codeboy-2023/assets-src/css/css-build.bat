@echo off
rem ====================================================================
rem build-css.bat:
rem  - Call "sass" to build the CSS (optionally watching for changes)
rem  - Param 1:  build|watch
rem ====================================================================
setlocal EnableDelayedExpansion
set "_action=%~1"

set "_src=themes/codeboy-2023/assets-src/css"
set "_dest=themes/codeboy-2023/assets/css"

set "_src_dest=%_src%/website.scss:%_dest%/website.css"

set "_opts1=--load-path=node_modules/@picocss/pico/scss"
set "_opts1=%_opts% --stop-on-error"
rem set "_opts1=%_opts% --style=expanded"

if "%_action%" == "build" (
    set "_opts2=--quiet-deps"
)
if "%_action%" == "watch" (
    set "_opts2=--watch"
)

sass %_src_dest% %_opts1% %_opts2%

endlocal
exit /B
