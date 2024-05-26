import classes from "../styles/Hero.module.css"
import potato_man_img from "../assets/potato_man.svg"
const Hero = () => {
  return (
    <div className={classes.hero__container}>
      <div className={classes.hero__center_box}>
        <div className={classes.hero__box_content}>
          <h1 className={classes.hero__title}>
            Let your idea find the right people
          </h1>
          <p className={classes.hero__description}>
            Connect with people and build your dream projects together
          </p>
          <button className={classes.hero__btn}>get started</button>
        </div>
        <div className={classes.hero__box_illustration}>
          <img className={classes.hero__potato_man} src={potato_man_img} />
        </div>
      </div>
    </div>
  )
}

export default Hero
