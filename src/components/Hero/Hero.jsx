import potato_man_img from "../../assets/potato_man.svg"

const Hero = () => {
  return (
    <section className="hero__section">
      <div className="hero__box_content">
        <h1 className={"hero__title"}>Let your idea find the right people</h1>
        <p className={"hero__description"}>
          Connect with people and build your dream projects together
        </p>
        <button className={"hero__btn"}>get started</button>
      </div>
      <div className={"hero__box_illustration"}>
        <img className={"hero__potato_man"} src={potato_man_img} />
      </div>
    </section>
  )
}

export default Hero
