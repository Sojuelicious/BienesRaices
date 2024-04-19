import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config({ path: '.env' })

const emailRegistro = async datos => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const { email, nombre, token } = datos

  //Enviar el email
  await transport.sendMail({
    from: 'BienesRainces.com',
    to: email,
    subject: 'Confirma tu cuenta en BienesRaices.com',
    text: 'Confirma tu cuenta en BienesRaices.com',
    html: `
        <p>Hola ${nombre}, Comprueba tu cuenta en BienesRaices.com</p>

        <p>Tu cuenta esta lista, solo debes confirmarlo en el siguiente enlace:
        
        <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}"
        >CLick Para Confirmar Tu Cuenta</a></p>


        <p>Ignora esta cuenta si no reconoces este email</p>
        
    `
  })
}

export { emailRegistro }
