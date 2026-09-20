# Despliegue en Vercel

Importa la carpeta `Pagina-Del-Valle-Software` como raíz del proyecto en Vercel. Vercel detectará Vite y publicará la página; la ruta `api/appointments` se desplegará como función serverless.

Antes de desplegar, crea estas variables de entorno para los entornos Production, Preview y Development:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- `COMPANY_EMAIL`
- `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`
- `COMPANY_CALENDAR_ID`
- `GOOGLE_REFRESH_TOKEN`
- Opcional: `OFFICE_ADDRESS`

`GOOGLE_REFRESH_TOKEN` debe pertenecer a la cuenta de Google que tiene permiso para crear eventos en `COMPANY_CALENDAR_ID`. Es un secreto de servidor: no debe añadirse al repositorio ni configurarse con el prefijo `VITE_`.

Tras configurar las variables, despliega de nuevo y realiza una reserva de prueba. Confirma que se cree el evento, que el enlace de Meet aparezca en las reuniones virtuales y que lleguen los dos correos.
