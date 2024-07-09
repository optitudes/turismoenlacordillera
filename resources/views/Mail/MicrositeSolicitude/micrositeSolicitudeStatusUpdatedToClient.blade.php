<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitud de micrositio</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
    }
    .header, .footer {
      background-color: #520120;
      color: white;
      padding: 5px;
      text-align: center;
    }
    .main-content {
      background-color: #08403E;
      padding: 8px;
      color: aliceblue;
      text-align: center;
    }
    .main-content h2 {
      margin: 0;
    }
    .main-content p {
      font-size: 20px;
      margin: 10px 0;
    }
    .footer p {
      font-size: 12px;
      margin: 5px 0;
    }
    .img-container {
      text-align: center;
    }
    .img-container img {
      width: 100%;
      max-width: 150px;
      height: auto;
    }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td class="header">
        <img src="https://beta.api.turismoenlacordillera.com/api/appinfo/public/getAppImage/lgfg.png" alt="Logo" />
      </td>
    </tr>
    <tr>
      <td class="main-content">
        <h2>Cambio de estado solicitud de micrositio</h2>
        <p>Su solicitud para el micrositio <strong>{{$micrositeName}}</strong>.</p>
        <p>Ha cambiado de estado a <strong>{{$newStatus}}</strong>.</p>
        <p>Comentario del admin:</p>
        <p>{{$comment}}</p>

        <div class="img-container">
          <img src="https://beta.api.turismoenlacordillera.com/api/appinfo/public/getAppImage/lgbg.png" alt="Imagen" />
        </div>
        <p>WWW.TURISMOENLACORDILLERA.COM</p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <
