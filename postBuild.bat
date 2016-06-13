@cd views
@FOR %%F IN ( *.jade ) DO @( @echo Emited %%~nF.pug && @copy %%F %%~nF.pug >nul )
@cd ..