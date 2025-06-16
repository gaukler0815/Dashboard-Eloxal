import React, { useEffect, useState } from "react";

interface Prognose {
  datum: string;
  schwefelsaeure: string;
  natronlauge: string;
  aluminium: string;
  aluminiumpreis: number;
  trend: string;
  nachfrage_deutschland: string;
  ereignisse: string[];
}

const Dashboard = () => {
  const [daten, setDaten] = useState<Prognose | null>(null);

  useEffect(() => {
    fetch("https://eloxal-backend.onrender.com/api/prognose")
      .then((res) => res.json())
      .then((data) => setDaten(data))
      .catch((err) => console.error("Fehler beim Laden der Prognose:", err));
  }, []);

  if (!daten) return <div className="p-6">Lade Prognose...</div>;

  const materialien = [
    {
      name: "Schwefelsäure",
      status: daten.schwefelsaeure,
      farbe: daten.schwefelsaeure === "verfuegbar" ? "green" : "orange"
    },
    {
      name: "Natronlauge",
      status: daten.natronlauge,
      farbe: daten.natronlauge === "moeglicher_engpass" ? "orange" : "green"
    },
    {
      name: "Aluminium",
      status: daten.aluminium,
      farbe: daten.aluminium === "lieferprobleme" ? "red" : "green"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Versorgungsrisiko-Prognose</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materialien.map((item) => (
          <div key={item.name} className="border rounded-2xl shadow-md p-4">
            <h2 className={`text-xl font-semibold text-${item.farbe}-600`}>{item.name}</h2>
            <p className={`text-${item.farbe}-500 font-medium`}>{item.status}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-700">Aluminium-Marktübersicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="p-4 border rounded-xl">Aluminiumpreis: <strong>{daten.aluminiumpreis} €/t</strong></div>
          <div className="p-4 border rounded-xl">Nachfrage in Deutschland: <strong>{daten.nachfrage_deutschland}</strong></div>
          <div className="p-4 border rounded-xl">Trend: <strong className="text-blue-600">{daten.trend}</strong></div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-md font-semibold text-gray-700">Aktuelle Entwicklungen</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          {daten.ereignisse.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
