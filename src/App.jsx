function App() {
  const test = async () => {
    const response = await fetch("http://localhost:3000/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <button onClick={test}>Invia richiesta</button>
    </>
  );
}

export default App;
