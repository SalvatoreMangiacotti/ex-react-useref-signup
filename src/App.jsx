import { useState } from 'react'

import './App.css'


function App() {

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    specialization: "",
    experience: "",
    description: ""
  });


  const [errors, setErrors] = useState({});


  // Validazione errori
  const validateValues = (values) => {
    const errors = {};

    if (!values.name.trim() ||
      !values.username.trim() ||
      values.password.length < 6 ||
      !values.specialization ||
      Number(values.experience) % 2 !== 0 ||
      !values.description.trim()
    ) { errors.name = "Verifica che tutti i campi siano corretti"; }

    console.log(errors);

    return errors;
  };


  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const validationErrors = validateValues(form);

    setErrors(validationErrors);

    if (Object.values(validationErrors).length > 0) {
      console.log("Errore, non hai compilato tutti i campi")
      return;
    }

    console.log(form);

  };


  return (

    <>

      <form className='custom-form' onSubmit={handleSubmit}>

        <label>Nome Completo:
          <input type="text"
            value={form.name}
            name="name"
            onChange={handleChange}
          />{errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>Username:
          <input type="text"
            value={form.username}
            name="username"
            onChange={handleChange}
          />{errors.username && <span className="error">{errors.username}</span>}
        </label>

        <label>Password:
          <input type="text"
            value={form.password}
            name="password"
            onChange={handleChange}
          />{errors.password && <span className="error">{errors.password}</span>}
        </label>

        <label>Specializzazione:
          <select
            value={form.specialization}
            name="specialization"
            onChange={handleChange}
          >
            <option value="">Seleziona una specializzazione</option>
            <option value="Full Stack">Full stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>{errors.specialization && <span className="error">{errors.specialization}</span>}
        </label>

        <label>Anni di esperienza:
          <input type="number"
            value={form.experience}
            name="experience"
            onChange={handleChange}
            min="0" max="100"
          />{errors.experience && <span className="error">{errors.experience}</span>}
        </label>

        <label>Breve descrizione sullo sviluppatore:
          <textarea
            value={form.description}
            name="description"
            onChange={handleChange}
          />{errors.description && <span className="error">{errors.description}</span>}
        </label>

        <button type="submit">Submit</button>

      </form>

    </>

  )

}

export default App



// Milestone 1: Creare un Form con Campi Controllati

// Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

// ✅ Nome completo (input di testo)

// ✅ Username (input di testo)

// ✅ Password (input di tipo password)

// ✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

// ✅ Anni di esperienza (input di tipo number)

// ✅ Breve descrizione sullo sviluppatore (textarea)