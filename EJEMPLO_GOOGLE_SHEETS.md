# Estructura de Google Sheets

Crea una hoja de cálculo en Google Sheets con la siguiente estructura:

## Nombre de la hoja: `Productos`

| id | nombre         | peso   | precio  | oferta | imagen                              | categorias | destacado | stock | descripcion       |
|----|----------------|--------|---------|--------|-------------------------------------|------------|-----------|-------|-------------------|
| 1  | Frambuesas     | 125 gr | $2.300  | 15     | /productos-destacados/frambuesas.png| Frambuesas | si        | 50    | Frutas frescas    |
| 2  | Arándanos      | 125 gr | $2.500  |        | /productos-destacados/arandanos.png | Arándanos  | si        | 30    | Frutas importadas |
| 3  | Zarzamoras     | 125 gr | $2.200  |        | /productos-destacados/zarzamoras.png| Zarzamoras | si        | 40    | Frutas orgánicas  |
| 4  | Mix de Berries | 250 gr | $2.800  | 10     | /productos-destacados/mix de berries.png| Mix de Berries | si | 25 | Mix de 4 frutas |

## Pasos para configurar:

1. Crea una hoja de cálculo en Google Sheets
2. Nombra la pestaña `Productos`
3. Agrega las columnas como se muestra arriba
4. Completa con tus productos
5. Haz la hoja pública (Compartir > Acceso general > Cualquier persona con el enlace puede ver)
6. Copia el ID de la hoja (está en la URL)
7. Crea un archivo `.env` en la raíz del proyecto con:
   ```
   GOOGLE_SHEET_ID=tu-id-aqui
   ```

## Notas importantes:

- **oferta**: Puedes dejarla vacía si no hay descuento, o poner solo el número (ej: 15 para 15% OFF)
- **destacado**: Escribe "si" si quieres que aparezca en la sección de productos destacados
- **imagen**: Puedes usar URLs o rutas locales (como /productos-destacados/...)
- Las categorías se extraen automáticamente de la columna `categorias`
