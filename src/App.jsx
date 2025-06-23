import { useState, useMemo } from 'react';
import './App.css';


function App() {

  // Stato iniziale del form

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    specialization: "",
    experience: "",
    description: ""
  });


  // Valori iniziali per la validazione degli errori

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";


  // Validazione dello username

  const isUsernameValid = useMemo(() => {
    const characters = form.username.trim().split("");
    return (
      characters.length >= 6 &&
      characters.every(char => letters.includes(char.toLowerCase()) || numbers.includes(char))
    );
  }, [form.username]);


  // Validazione della password

  const isPasswordValid = useMemo(() => {
    const password = form.password.trim();
    return (
      password.length >= 6 &&
      [...password].some(char => letters.includes(char)) &&
      [...password].some(char => numbers.includes(char)) &&
      [...password].some(char => symbols.includes(char))
    );
  }, [form.password]);


  // Validazione della descrizione

  const isDescriptionValid = useMemo(() => {
    const length = form.description.trim().length;
    return length >= 100 && length < 1000;
  }, [form.description]);


  // Gestione del cambiamento di ogni campo del form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };


  // Gestione dell'invio del form e verifica dei campi

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.username.trim() ||
      !form.password.trim() ||
      !form.specialization.trim() ||
      !form.experience.toString().trim() ||
      !form.description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      console.log("Errore, compila tutti i campi correttamente");
      return;
    }

    console.log("Form inviato con successo:", form);

  };


  // Rendering del form.
  // Per ogni campo appare un messaggio di successo o di errore, in tempo reale.

  return (

    <form className="custom-form" onSubmit={handleSubmit}>

      <label>
        Nome Completo:
        <input type="text" name="name" value={form.name} onChange={handleChange} />
      </label>


      <label>
        Username:
        <input type="text" name="username" value={form.username} onChange={handleChange} />

        {form.username.trim() && (
          <span className="error" style={{ color: isUsernameValid ? "green" : "red" }}>
            {isUsernameValid ? "Username valido" : "Sono richiesti almeno 6 caratteri"}
          </span>
        )}
      </label>


      <label>
        Password:
        <input type="text" name="password" value={form.password} onChange={handleChange} />

        {form.password.trim() && (
          <span className="error" style={{ color: isPasswordValid ? "green" : "red" }}>
            {isPasswordValid ? "Password valida" : "Sono richiesti almeno  1 lettera, 1 numero e 1 simbolo"}
          </span>
        )}
      </label>


      <label>
        Specializzazione:
        <select name="specialization" value={form.specialization} onChange={handleChange}>
          <option value="">Seleziona una specializzazione</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
      </label>


      <label>
        Anni di esperienza:
        <input type="number" name="experience" value={form.experience} onChange={handleChange} min="0" />
      </label>


      <label>
        Descrizione:
        <textarea name="description" value={form.description} onChange={handleChange} />

        {form.description.trim() && (
          <span className="error" style={{ color: isDescriptionValid ? "green" : "red" }}>
            {isDescriptionValid ? "Grazie per aver fornito una descrizione valida!" : "Sono richiesti un minimo 100 e un massimo 1000 caratteri"}
          </span>
        )}
      </label>

      <button type="submit">Invia</button>

    </form>

  );

}


export default App;