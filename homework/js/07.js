let jsonData = '[{"name": "麒麟山", "dist": 3}, {"name": "金門大橋", "dist": 2}, {"name": "沙美老街", "dist": 8}]';
let locations = JSON.parse(jsonData);

for (let i = 0; i < locations.length; i++) {
    if (locations[i].dist < 5) {
        console.log(`推薦景點: ${locations[i].name}`);
    }
}