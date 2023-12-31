const express = require('express');
const app = express();
const port = 3000;

app.get('/distance', (req, res) => {
    try {
        const origins = req.query.origins.split(',').map(parseFloat);
        const destinations = req.query.destinations.split(',').map(parseFloat);

        if (origins.length !== 2 || destinations.length !== 2) {
            throw new Error('Invalid coordinates format');
        }

        const [lat1, lon1] = origins;
        const [lat2, lon2] = destinations;

        // Convertir les coordonnées degrés décimaux en radians
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        // Coordonnées en radians
        const lat1Rad = toRadians(lat1);
        const lat2Rad = toRadians(lat2);

        // Calcul de la distance en utilisant la formule de l'haversine
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Rayon de la Terre en kilomètres (approximatif)
        const R = 6371.0;

        // Distance en kilomètres
        const distance = R * c;

        res.json({ distance: distance });
    } catch (error) {
        res.json({ error: error.message });
    }
});

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
