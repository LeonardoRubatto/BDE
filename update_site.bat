@echo off
chcp 65001 >nul 2>&1
title BDE Dauphine - Mise a jour du site
color 0A

echo.
echo  ================================================
echo   BDE Dauphine -- Mise a jour du site
echo  ================================================
echo.
echo  Lecture de admin.xlsx en cours...
echo  IMPORTANT : ferme Excel avant de continuer !
echo.

:: Chercher Python (py = launcher Windows, python = install directe)
where py >nul 2>&1
if %errorlevel% equ 0 (
    py sync.py
    goto :check
)
where python >nul 2>&1
if %errorlevel% equ 0 (
    python sync.py
    goto :check
)
where python3 >nul 2>&1
if %errorlevel% equ 0 (
    python3 sync.py
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
    echo  Si Excel est ouvert sur admin.xlsx, ferme-le et reessaie.
    echo.
    pause
    exit /b 1
)

echo.
echo  Les fichiers data/*.js sont a jour.
echo  Tu peux maintenant deployer le site sur Cloudflare.
echo.
pause
