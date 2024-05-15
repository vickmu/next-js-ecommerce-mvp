"use client";

import React, { useState } from 'react';
import getShipment from '@/services/shipstation/getShipment';
const ScanPage = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [shipmentDetails, setShipmentDetails] = useState(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNumber(event.target.value);
    };

    const handleFindShipment = async () => {
        try {
            const shipment = await getShipment(orderNumber);
            setShipmentDetails(shipment);
        } catch (error) {
            console.error('Error finding shipment:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">VickStation</div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="workflow" className="mr-2">Workflow:</label>
                    <select id="workflow" className="p-2 text-black">
                        <option value="verify-print">Scan to Verify & Print</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Scan or type an order number"
                        value={orderNumber}
                        onChange={handleInputChange}
                        className="p-2 text-black"
                    />
                    <button
                        onClick={handleFindShipment}
                        className="p-2 bg-blue-500 text-white"
                    >
                        Find Shipment
                    </button>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center bg-gray-700 text-white">
                <div className="text-2xl">
                    Scan a packing slip. You can also type in an order number.
                </div>
                {shipmentDetails && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Shipment Details</h2>
                        {/* Render shipment details here */}
                        <pre>{JSON.stringify(shipmentDetails, null, 2)}</pre>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ScanPage;
