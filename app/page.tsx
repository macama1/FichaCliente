"use client";
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function FichaCreacionCliente() {
  const [datos, setDatos] = useState({
    // Encabezado
    vendedor: '',
    // 1. Facturación
    razonSocial: '', rut: '', giro: '', dirFacturacion: '', comunaFacturacion: '', ciudadFacturacion: '',
    // 2. Contacto
    nombreContacto: '', cargoContacto: '', emailContacto: '', telContacto: '',
    // 3. Cobranza
    nombreCobranza: '', emailCobranza: '', telCobranza: '',
    // 4. Condiciones y Canal
    condicionPago: 'Contado', canal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Título y Vendedor
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("FICHA DE CREACIÓN DE CLIENTE", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Vendedor Asignado: ${datos.vendedor || 'No especificado'}`, 105, 28, { align: "center" });

    // 1. DATOS DE FACTURACIÓN
    autoTable(doc, {
      startY: 35,
      head: [['1. DATOS DE FACTURACIÓN', '']],
      body: [
        ['Razón Social / Nombre', datos.razonSocial],
        ['RUT', datos.rut],
        ['Giro', datos.giro],
        ['Dirección', datos.dirFacturacion],
        ['Comuna / Ciudad', `${datos.comunaFacturacion} / ${datos.ciudadFacturacion}`],
      ],
      theme: 'grid', headStyles: { fillColor: [40, 40, 40] },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } }
    });

    // 2. CONTACTO DEL CLIENTE
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [['2. CONTACTO DEL CLIENTE', '']],
      body: [
        ['Nombre Completo', datos.nombreContacto],
        ['Cargo', datos.cargoContacto],
        ['Correo Electrónico', datos.emailContacto],
        ['Teléfono', datos.telContacto],
      ],
      theme: 'grid', headStyles: { fillColor: [40, 40, 40] },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } }
    });

    // 3. DATOS DE COBRANZA
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [['3. DATOS DE COBRANZA', '']],
      body: [
        ['Nombre Encargado', datos.nombreCobranza],
        ['Correo de Cobranza', datos.emailCobranza],
        ['Teléfono', datos.telCobranza],
      ],
      theme: 'grid', headStyles: { fillColor: [40, 40, 40] },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } }
    });

    // 4. CONDICIONES DE VENTA Y CANAL
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [['4. CONDICIONES DE VENTA Y CANAL', '']],
      body: [
        ['Forma de Pago', datos.condicionPago],
        ['Canal de Venta', datos.canal],
      ],
      theme: 'grid', headStyles: { fillColor: [40, 40, 40] },
      columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } }
    });

    // Guardar
    doc.save(`Ficha_Cliente_${datos.rut || 'Nuevo'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-sm text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-md border border-gray-300">
        
        {/* ENCABEZADO PRINCIPAL */}
        <div className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold uppercase text-center">Formulario de Creación de Cliente</h1>
        </div>

        {/* SECCIÓN VENDEDOR ASIGNADO */}
        <div className="bg-blue-50 border-b border-blue-200 p-6 flex flex-col md:flex-row items-center gap-4">
          <label className="font-bold uppercase text-blue-900 tracking-wider">Vendedor Asignado:</label>
          <select 
            name="vendedor" 
            onChange={handleChange} 
            className="flex-1 border border-blue-300 p-3 rounded bg-white shadow-sm font-semibold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Seleccione un vendedor --</option>
            <option value="Andrés Pacheco">Andrés Pacheco</option>
            <option value="Eduardo Arias">Eduardo Arias</option>
            <option value="David Fuentealba">David Fuentealba</option>
            <option value="Jorge Nario">Jorge Nario</option>
            <option value="Loreto Medina">Loreto Medina</option>
            <option value="Manuel Urzúa">Manuel Urzúa</option>
            <option value="Mauricio Carvajal">Mauricio Carvajal</option>
            <option value="Mónica Valencia">Mónica Valencia</option>
          </select>
        </div>

        <div className="p-6 space-y-8">
          
          {/* 1. FACTURACIÓN */}
          <section>
            <h2 className="bg-gray-200 font-bold p-2 mb-3 uppercase border-l-4 border-gray-800">1. Datos de Facturación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Razón Social</label>
                <input type="text" name="razonSocial" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">RUT</label>
                <input type="text" name="rut" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
              </div>
              <div className="col-span-3">
                <label className="block font-semibold mb-1">Giro</label>
                <input type="text" name="giro" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
              </div>
              <div className="col-span-1">
                <label className="block font-semibold mb-1">Dirección</label>
                <input type="text" name="dirFacturacion" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Comuna</label>
                <input type="text" name="comunaFacturacion" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ciudad</label>
                <input type="text" name="ciudadFacturacion" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 2. CONTACTO */}
            <section>
              <h2 className="bg-gray-200 font-bold p-2 mb-3 uppercase border-l-4 border-gray-800">2. Contacto del Cliente</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Nombre</label>
                  <input type="text" name="nombreContacto" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Cargo</label>
                  <input type="text" name="cargoContacto" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <input type="email" name="emailContacto" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Teléfono</label>
                  <input type="text" name="telContacto" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
              </div>
            </section>

            {/* 3. COBRANZA */}
            <section>
              <h2 className="bg-gray-200 font-bold p-2 mb-3 uppercase border-l-4 border-gray-800">3. Datos de Cobranza</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Nombre Encargado</label>
                  <input type="text" name="nombreCobranza" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email de Cobranza</label>
                  <input type="email" name="emailCobranza" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Teléfono</label>
                  <input type="text" name="telCobranza" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-gray-400 outline-none" />
                </div>
              </div>
            </section>
          </div>

          {/* 4. CONDICIONES Y CANAL */}
          <section>
            <h2 className="bg-gray-200 font-bold p-2 mb-3 uppercase border-l-4 border-gray-800">4. Condiciones y Canal</h2>
            {/* Cambiado a grid-cols-2 para que ocupe bien el espacio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Forma de Pago</label>
                <select name="condicionPago" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded bg-white focus:ring-1 focus:ring-gray-400 outline-none">
                  <option value="Contado">Contado</option>
                  <option value="Crédito 30 días">Crédito 30 días</option>
                  <option value="Anticipo">Anticipo</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Canal</label>
                <select name="canal" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded bg-white focus:ring-1 focus:ring-gray-400 outline-none">
                  <option value="">-- Seleccionar --</option>
                  <option value="Constructora pequeña">Constructora pequeña</option>
                  <option value="Constructora mediana">Constructora mediana</option>
                  <option value="Constructora grande">Constructora grande</option>
                  <option value="Ferretería">Ferretería</option>
                  <option value="Distribuidor">Distribuidor</option>
                  <option value="Especialista">Especialista</option>
                  <option value="Instalador">Instalador</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Particular">Particular</option>
                </select>
              </div>
            </div>
          </section>

        </div>

        {/* BOTÓN EXPORTAR */}
        <div className="p-6 bg-gray-50 border-t flex justify-center">
          <button 
            onClick={generarPDF}
            className="bg-gray-800 text-white px-10 py-4 rounded uppercase font-bold hover:bg-black transition-colors shadow-lg"
          >
            Exportar Ficha a PDF
          </button>
        </div>

      </div>
    </div>
  );
}