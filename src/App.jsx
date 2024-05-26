import Hero from "./sections/Hero"

function App() {
  return (
    <>
    {/* this should be Navbar here instead of div*/}
      <div style={{ minHeight: "10vh", border: "2px solid black" }}>
        Nav bar
      </div>
      <Hero />
    </>
  )
}

export default App
