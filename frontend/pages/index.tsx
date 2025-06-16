import React from "react";

const daten = [
  {
    name: "Schwefelsäure",
    status: "Verfügbar",
    beschreibung: "Keine bedeutenden Lieferunterbrechungen erwartet",
    farbe: "green"
  },
  {
    name: "Natronlauge",
    status: "Möglicher Engpass",
    beschreibung: "Werkschließungen könnten in den nächsten drei Monaten zu Engpässen führen",
    farbe: "orange"
  },
  {
    name: "Aluminium",
    status: "Lieferprobleme",
    beschreibung: "Sanktionen und Beschränkungen könnten Versorgung und Preis beeinflussen",
    farbe: "red"
  }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Versorgungsrisiko-Prognose</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {daten.map((item) => (
          <div key={item.name} className="border rounded-2xl shadow-md p-4">
            <h2 className={`text-xl font-semibold text-${item.farbe}-600`}>{item.name}</h2>
            <p className={`text-${item.farbe}-500 font-medium`}>{item.status}</p>
            <p className="text-sm text-gray-600 mt-2">{item.beschreibung}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
