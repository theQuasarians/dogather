import Hero from "../components/Hero/Hero"

function App() {
  return (
    <>
      {/* this ↓ should be Navbar here instead of div*/}
      {/* this  div will replaced by NavBar component it reserve a place for it */}
      <div style={{ minHeight: "10vh", border: "2px solid black" }}>
        Nav bar
      </div>
      <Hero />
    </>
  )
}

export default App
