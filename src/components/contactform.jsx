"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [divipolaData, setDivipolaData] = useState({});
  const [nivelesCargo] = useState([
    "Auxiliar",
    "Técnico",
    "Asistente",
    "Analista",
    "Coordinador",
    "Director",
    "Gerente",
  ]);

  // Función para cambiar cualquier texto a mayuscula inicial (nombre propio)
  const initialCapitalLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    cargo: "",
    nivelCargo: "",
    empresa: "",
    departamento: "",
    ciudad: "",
    comentarios: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchDivipola = async () => {
      try {
        const res = await fetch("/api/divipola");
        const data = await res.json();
        setDivipolaData(data);
      } catch (error) {
        toast.error("Error al cargar departamentos y municipios");
      }
    };

    fetchDivipola();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT,
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          cargo: formData.cargo,
          nivelCargo: formData.nivelCargo,
          empresa: formData.empresa,
          departamento: formData.departamento,
          ciudad: formData.ciudad,
          comentarios: formData.comentarios,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );


      console.log("Email enviado:", result.text);
      toast.success("¡Formulario enviado con éxito!");

      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        cargo: "",
        nivelCargo: "",
        empresa: "",
        departamento: "",
        ciudad: "",
        comentarios: "",
      });
    } catch (error) {
      console.error("Error al enviar email:", error);
      toast.error("Hubo un error al enviar el formulario.");
    }

    setIsLoading(false);
  };
  const departamentos = Object.keys(divipolaData);
  const ciudades = formData.departamento
    ? divipolaData[formData.departamento]?.municipios || []
    : [];

  return (
    <section className="py-16 bg-white rounded-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Contáctanos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Nombre", name: "nombre" },
              { label: "Apellido", name: "apellido" },
              { label: "Correo Electrónico", name: "correo", type: "email" },
              { label: "Cargo o Rol", name: "cargo" },
              { label: "Empresa u Organización", name: "empresa" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
                />
              </div>
            ))}

            {/* Nivel del cargo */}
            <div>
              <label htmlFor="nivelCargo" className="block text-sm font-medium text-gray-700 mb-2">
                Nivel del Cargo
              </label>
              <select
                id="nivelCargo"
                name="nivelCargo"
                value={formData.nivelCargo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
              >
                <option value="">Selecciona el nivel</option>
                {nivelesCargo.map((nivel) => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>

            {/* Departamento */}
            <div>
              <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-2">
                Departamento
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep} value={dep}>{initialCapitalLetter(dep)}</option>
                ))}
              </select>
            </div>

            {/* Ciudad */}
            <div>
              <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <select
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
                disabled={!ciudades.length}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
              >
                <option value="">Selecciona una ciudad</option>
                {ciudades.map(({ nombre, cod_mpio }) => (
                  <option key={cod_mpio} value={nombre}>{initialCapitalLetter(nombre)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
            />
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`relative flex items-center justify-center gap-2 bg-[#df7b7b] text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#d45858]"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="loader" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Tus datos serán tratados con total confidencialidad.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
