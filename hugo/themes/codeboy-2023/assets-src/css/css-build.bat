@echo off
rem ====================================================================
rem build-css.bat:
rem  - Call "sass" to build the CSS (optionally watching for changes)
rem  - Param 1:  build|watch
rem  - Param 2:  CSS file name (excluding .extension)
rem ====================================================================
setlocal EnableDelayedExpansion
set "_action=%~1"

set "_css=website"
set "_src=themes/codeboy-2023/assets-src/css"
set "_dest=assets/built"

set "_src_dest=%_src%/%_css%.scss:%_dest%/%_css%.css"

set "_opts=--load-path=node_modules/@picocss/pico/scss"
rem set "_opts=%_opts% --style=expanded"

if "%_action%" == "build" (
    set "_opts=%_opts% --stop-on-error"
    set "_opts=%_opts% --quiet-deps"
    set "_opts=%_opts% --style=compressed"
)
if "%_action%" == "watch" (
    set "_opts=%_opts% --error-css"
    set "_opts=%_opts% --watch"
)

sass %_src_dest% %_opts%

endlocal
exit /B
