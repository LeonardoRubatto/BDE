@echo off
chcp 65001 >nul 2>&1
title BDE Dauphine - Initialisation Excel
color 0A

echo.
echo  ================================================
echo   BDE Dauphine -- Initialisation admin.xlsx
echo  ================================================
echo.
echo  Lecture des fichiers data/*.js en cours...
echo  (Ferme Excel si il est ouvert)
echo.

:: Chercher Python (py = launcher Windows, python = install directe)
where py >nul 2>&1
if %errorlevel% equ 0 (
    py sync_init.py
    goto :check
)
where python >nul 2>&1
if %errorlevel% equ 0 (
    python sync_init.py
    goto :check
)
where python3 >nul 2>&1
if %errorlevel% equ 0 (
    python3 sync_init.py
    goto :check
)

echo.
echo  ERREUR : Python n'est pas installe ou introuvable.
echo.
echo  Installer Python depuis : https://www.python.org/downloads/
echo  Cocher "Add Python to PATH" lors de l'installation.
echo.
pause
exit /b 1

:check
if %errorlevel% neq 0 (
    echo.
    echo  Une erreur s'est produite. Verifie les messages ci-dessus.
    echo.
    pause
    exit /b 1
)

echo.
echo  admin.xlsx est pret. Tu peux l'ouvrir dans Excel.
echo.
pause
