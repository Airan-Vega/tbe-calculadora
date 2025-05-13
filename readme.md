# Torresburriel Estudio - Prueba Técnica: Calculadora con StencilJS

> Solución a la prueba técnica para el puesto de Frontend Engineer en Torresburriel Estudio.  
> Implementado con **StencilJS**, **TypeScript** y **SCSS** siguiendo buenas prácticas de componentización modular.

---

## ✅ Objetivo

Crear una calculadora funcional que cumpla los siguientes requisitos:
- Muestre el valor actual en un display.
- Registre todas las operaciones realizadas en un historial (`log`).
- Usando **StencilJS** con opción `component`.
- Uso de **TypeScript** y **SCSS**.
- Modularidad: varios componentes reutilizables.
- Diseño limpio y moderno.
- Soporte de operaciones matemáticas básicas (+, −, ×, ÷).

---

## 🧩 Arquitectura del Proyecto

La aplicación está dividida en los siguientes componentes reutilizables:

| Componente        | Función |
|-------------------|---------|
| `calc-display`    | Muestra el número actual o resultado en pantalla. |
| `calc-keypad`     | Contiene un panel de botones para ingresar números y operadores. |
| `calc-button`     | Componente reutilizable para cada botón del teclado. |
| `calc-log`        | Muestra el registro de todas las operaciones realizadas. |
| `app-root`        | Archivo principal que une todos los componentes. |

---

## ⚙️ Tecnologías utilizadas

- **StencilJS** (con modo componente)
- **TypeScript**
- **SCSS** (para estilos modulares)
- **Jest** (para tests unitarios)

---

## 📦 Instalación y ejecución

### Requisitos previos

- Node.js (v16+ recomendado)
- npm o yarn

---

### Pasos para instalar y probar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Airan-Vega/tbe-calculadora.git
   
   cd tbe-calculadora

2. Instala los paquetes de node:

   ```bash
   npm i ó npm install

3. Levanta el proyecto:

   ```bash
   npm start

4. Ejecuta los tests:

   ```bash
   npm test