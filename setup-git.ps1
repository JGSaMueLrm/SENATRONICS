# Script para subir el proyecto a GitHub
# Usuario: JGSaMueLrm
# Repositorio: SENATRONICS

Write-Host "=== Configuración de Git para SENATRONICS ===" -ForegroundColor Green

# Verificar si Git está instalado
$gitPath = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $gitPath)) {
    Write-Host "Git no está instalado. Por favor instala Git desde: https://git-scm.com/download/win" -ForegroundColor Red
    exit
}

# Configurar Git (solo primera vez)
& $gitPath config --global user.name "JGSaMueLrm"
& $gitPath config --global user.email "1559447@senati.pe"

Write-Host "Configuración de usuario completada" -ForegroundColor Green

# Inicializar repositorio
Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
& $gitPath init

# Agregar todos los archivos
Write-Host "Agregando archivos..." -ForegroundColor Yellow
& $gitPath add .

# Crear commit
Write-Host "Creando commit..." -ForegroundColor Yellow
& $gitPath commit -m "Sistema de inventario completo - Backend Express con 6 entidades"

# Conectar con GitHub
Write-Host "Conectando con repositorio SENATRONICS..." -ForegroundColor Yellow
& $gitPath remote add origin https://github.com/JGSaMueLrm/SENATRONICS.git

# Subir código
Write-Host "Subiendo código a GitHub..." -ForegroundColor Yellow
& $gitPath push -u origin main

Write-Host "=== ¡Proyecto subido exitosamente! ===" -ForegroundColor Green
Write-Host "Repositorio: https://github.com/JGSaMueLrm/SENATRONICS" -ForegroundColor Cyan
