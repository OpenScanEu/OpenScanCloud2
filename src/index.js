import 'dotenv/config';
import app from './server.js';

console.log(process.env.HOST)

const PORT = process.env.PORT || 8080;
const URL = process.env.URL || "unkown url";

app.listen(PORT, () => {
    console.log(`Server running on ${URL}`);
});

