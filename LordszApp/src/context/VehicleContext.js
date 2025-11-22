import React, { createContext, useState, useContext } from 'react';

const VehicleContext = createContext();

const createTires = (count, specialIndex, vehicleId, specialStatus = 'Atenção') => {
  const positions = [
    'Dianteiro direito',
    'Dianteiro esquerdo',
    'Traseiro direito',
    'Traseiro esquerdo',
    'Centro direito',
    'Centro esquerdo',
    'Traseiro 2 direito',
    'Traseiro 2 esquerdo',
  ];

  return Array.from({ length: count }).map((_, i) => {
    const idx = i % positions.length;
    const status = specialIndex && specialIndex === i + 1 ? specialStatus : 'OK';
    const pressure = status !== 'OK' ? '28 PSI' : `${32 - (i % 3)} PSI`;
    return {
      id: vehicleId ? `tire-${vehicleId}-${i + 1}` : `${Date.now()}-${i}`,
      name: `Pneu ${i + 1}`,
      position: positions[idx],
      pressure,
      status,
      tread: 'Banda de rodagem',
      history: [],
    };
  });
};

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: 'NFB-4342',
      model: 'FH - Volvo',
      status: 'ok',
      tireCount: 4,
      tires: createTires(4, 2, 1),
    },
    {
      id: 2,
      plate: 'MHL-8441',
      model: 'Accelo - Mercedes',
      status: 'serious',
      tireCount: 6,
      tires: createTires(6, 3, 2, 'Sério'),
    },
    {
      id: 3,
      plate: 'MOI-8865',
      model: 'FH - Volvo',
      status: 'warning',
      tireCount: 8,
      tires: createTires(8, 5, 3, 'Atenção'),
    },
    {
      id: 4,
      plate: 'MZN-3339',
      model: 'Accelo - Mercedes',
      status: 'problem',
      tireCount: 10,
      tires: createTires(10, 4, 4, 'Crítico'),
    },
  ]);

  const addVehicle = (vehicle) => {
    const tireCount = Number(vehicle.tireCount) || 6;
    const newVehicle = {
      id: Date.now(),
      status: 'ok',
      ...vehicle,
      tireCount,
      tires: createTires(tireCount),
    };

    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const addTire = (vehicleId, tire) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId
          ? { ...v, tires: [...(v.tires || []), { id: Date.now(), ...tire }] }
          : v
      )
    );
  };

  const updateTire = (vehicleId, tireId, patch) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== vehicleId) return v;
        return {
          ...v,
          tires: (v.tires || []).map((t) => (t.id === tireId ? { ...t, ...patch } : t)),
        };
      })
    );
  };

  const updateVehicle = (vehicleId, patch) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, ...patch } : v))
    );
  };

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, addTire, updateTire, updateVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => useContext(VehicleContext);
