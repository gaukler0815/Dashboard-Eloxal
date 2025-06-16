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
    fetch("https://dein-backend-url.onrender.com/api/prognose")
      .then((res) => res.json())
      .then((data) => setDaten(data))
      .catch((err) => console.error("Fehler beim Laden der Prognose:", err));
  }, []);

  if (!daten) return <div className="p-6">Lade Prognose...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Versorgungsrisiko-Prognose</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ name: "Schwefelsäure", wert: daten.schwefelsaeure }, { name: "Natronlauge", wert: daten.natronlauge }, { name: "Aluminium", wert: daten.aluminium }].map((item, i) => (
          <div key={i} className="border rounded-2xl shadow-md p-4">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{item.wert}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-md font-semibold text-gray-700">Weitere Informationen</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>Preis: {daten.aluminiumpreis} €/t</li>
          <li>Trend: {daten.trend}</li>
          <li>Nachfrage in Deutschland: {daten.nachfrage_deutschland}</li>
          {daten.ereignisse.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
