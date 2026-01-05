import styles from './Style.module.css'

const Whatsapp = () => {
  return (
    <div className={styles.container}>
      <a href='https://wa.me/+51957033871?text=Hola,%20deseo%20realizar%20una%20consulta...' target='_blank'>
        <img
        className={styles.boton}
        src='/images/icono.png'
        alt='jesac-whatsapp'/>
      </a>
    </div>
  )
}

export default Whatsapp