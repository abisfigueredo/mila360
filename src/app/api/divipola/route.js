let cachedData = null;

export async function GET() {
  if (cachedData) {
    return Response.json(cachedData);
  }

  try {
    const response = await fetch("https://www.datos.gov.co/resource/gdxc-w37w.json?$limit=5000");
    const raw = await response.json();

    const departamentos = {};

    raw.forEach(({ dpto, cod_dpto, nom_mpio, cod_mpio }) => {
      const dep = dpto?.trim();
      const depCode = cod_dpto?.trim();
      const city = nom_mpio?.trim();
      const cityCode = cod_mpio?.trim();

      if (dep && city) {
        if (!departamentos[dep]) {
          departamentos[dep] = {
            cod_dpto: depCode,
            municipios: [],
          };
        }

        departamentos[dep].municipios.push({
          nombre: city,
          cod_mpio: cityCode,
        });
      }
    });

    cachedData = departamentos;

    return Response.json(departamentos);
  } catch (error) {
    console.error("Error al consultar Datos.gov.co:", error);
    return new Response(JSON.stringify({ error: "No se pudo obtener la información de DIVIPOLA" }), {
      status: 500,
    });
  }
}
