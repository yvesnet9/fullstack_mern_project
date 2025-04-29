import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"

function SignUp() {
  
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // La requette vers l'Api (ou backend)
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        }, 
        // Les données envoyées au serveur
        body: JSON.stringify(formData)
      });
      //reponse du serveur en cas d'erreur
      const data = await res.json()
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        return
      }
      // si c'est ok
      setLoading(false) 
      setError(null)
      navigate("/sign-in")
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }





  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Inscription</h1>
      <form onSubmit={handleSubmit} className="flex-col flex gap-4">
        <input onChange={handleChange} type="text" className="border p-3 rounded-lg" placeholder="Entrez votre nom" id="username"/>
        <input onChange={handleChange} type="email" className="border p-3 rounded-lg" placeholder="Entrez votre email" id="email"/>
        <input onChange={handleChange} type="password" className="border p-3 rounded-lg" placeholder="Entrez votre mot de passe" id="password"/>
        <button disabled = {loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading": "Inscription"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Vous avez déjà un compte?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Connexion</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default SignUp