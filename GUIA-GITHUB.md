# Guía para Subir el Proyecto a GitHub

## Opción 1: Usando el Script Automatizado (Requiere Git instalado)

1. **Instalar Git** (si no lo tienes):
   - Descarga: https://git-scm.com/download/win
   - Instala con las opciones por defecto

2. **Ejecutar el script**:
   ```powershell
   cd C:\Users\USUARIO\Downloads\backend-express
   .\setup-git.ps1
   ```

3. **Si te pide autenticación**:
   - Usuario: JGSaMueLrm
   - Contraseña: Tu Personal Access Token de GitHub

---

## Opción 2: Usando GitHub Desktop (Más Fácil)

1. **Descargar GitHub Desktop**:
   - https://desktop.github.com/

2. **Iniciar sesión** con tu cuenta de GitHub

3. **Agregar repositorio local**:
   - File → Add Local Repository
   - Selecciona: `C:\Users\USUARIO\Downloads\backend-express`

4. **Publicar**:
   - Click en "Publish repository"
   - Nombre: SENATRONICS
   - Descripción: Sistema de inventario con Express y MySQL
   - Click "Publish Repository"

---

## Opción 3: Crear Repositorio Manualmente en GitHub

1. **Ir a GitHub**: https://github.com/new

2. **Crear repositorio**:
   - Repository name: `SENATRONICS`
   - Description: `Sistema de inventario con Express y MySQL`
   - Public o Private (tu elección)
   - NO marcar "Initialize with README"
   - Click "Create repository"

3. **Subir archivos**:
   - En la página del repositorio creado
   - Click "uploading an existing file"
   - Arrastra toda la carpeta `backend-express`
   - Commit: "Sistema de inventario completo"
   - Click "Commit changes"

---

## Información del Proyecto

- **Usuario GitHub**: JGSaMueLrm
- **Email**: 1559447@senati.pe
- **Repositorio**: SENATRONICS
- **URL**: https://github.com/JGSaMueLrm/SENATRONICS

---

## Archivos Importantes Creados

✅ `.gitignore` - Excluye node_modules y archivos innecesarios
✅ `README.md` - Documentación del proyecto
✅ `setup-git.ps1` - Script automatizado para Git

---

## ⚠️ IMPORTANTE

**NO subas el archivo `.env` si lo creas** (ya está en .gitignore)
**NO subas la carpeta `node_modules`** (ya está en .gitignore)
