// generatePDF.js
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { pdf, Document, Page, Text, View, StyleSheet } = require('@react-pdf/renderer');

// Tu componente PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#000'
  },
  section: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: '#152c62',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  heading: {
    fontSize: 14,
    color: '#df7b7b',
    marginBottom: 4,
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 8,
    lineHeight: 1.5,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 4,
  }
});

const GuiaLey2365 = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Guía Gratuita: 5 pasos para cumplir la Ley 2365 de 2024</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Introducción</Text>
        <Text style={styles.text}>
          La Ley 2365 de 2024 de Colombia establece medidas para prevenir, atender y sancionar el acoso sexual laboral.
          Toda empresa, sin importar su tamaño, debe cumplir con esta normativa para garantizar un entorno laboral seguro, libre de violencia y respetuoso.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Paso 1: Diagnóstico Interno</Text>
        <Text style={styles.text}>
          Evalúa el estado actual de la empresa. Revisa políticas existentes, identifica antecedentes y usa encuestas o entrevistas para medir el clima laboral.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Paso 2: Política de Prevención</Text>
        <Text style={styles.text}>
          Crea una Política de Prevención del Acoso Sexual Laboral con definiciones claras, canales de denuncia confidenciales y responsables designados.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Paso 3: Capacitación Obligatoria</Text>
        <Text style={styles.text}>
          Implementa capacitaciones periódicas para todos los colaboradores. Se recomienda una vez al año, usando sesiones presenciales o digitales.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Paso 4: Documentación y Seguimiento</Text>
        <Text style={styles.text}>
          Registra todas las acciones realizadas: capacitaciones, políticas, denuncias y acciones tomadas. Esta documentación es clave para auditorías.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Paso 5: Evaluación y Mejora Continua</Text>
        <Text style={styles.text}>
          Realiza auditorías internas, encuestas de clima laboral y revisiones periódicas para actualizar tus medidas y mejorar continuamente.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Nuestra solución digital te ayuda a:</Text>
        <Text style={styles.listItem}>• Evaluar tu situación actual</Text>
        <Text style={styles.listItem}>• Crear tu política interna</Text>
        <Text style={styles.listItem}>• Capacitar a tu equipo</Text>
        <Text style={styles.listItem}>• Documentar y reportar</Text>
        <Text style={styles.listItem}>• Promover una transformación cultural real</Text>
        <Text style={styles.text}>
          Visita nuestra app o solicita una demo gratuita.
        </Text>
      </View>
    </Page>
  </Document>
);

// Generar y guardar el PDF
const generatePDF = async () => {
  const pdfDoc = pdf();
  pdfDoc.updateContainer(<GuiaLey2365 />);
  const pdfBuffer = await pdfDoc.toBuffer();
  fs.writeFileSync('./public/guia-ley2365.pdf', pdfBuffer);
  console.log('✅ PDF generado en public/guia-ley2365.pdf');
};

generatePDF();
