// src/services/shipstation/getShipment.ts
import axios from 'axios';

const API_BASE_URL = 'https://ssapi.shipstation.com';
const API_KEY = process.env.SHIPSTATION_API_KEY;
const API_SECRET = process.env.SHIPSTATION_API_SECRET;

const getShipment = async (orderNumber: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shipments`, {
            auth: {
                username: API_KEY,
                password: API_SECRET
            },
            params: {
                orderNumber
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching shipment:', error);
        throw new Error('Failed to fetch shipment');
    }
};

export default getShipment;
