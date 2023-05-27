const express = require('express');
const app = express();
const cors = require('cors');
const SwaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidocs.json')

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(apiDocumentation))

const userRoute = require('./src/routes/users')
const logisticsRoute = require('./src/routes/logistics')

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3300;

app.use('/users', userRoute)
app.use('/logistics', logisticsRoute)

app.listen(PORT, () => {
    console.log(`server is running port : ${PORT}`)
});