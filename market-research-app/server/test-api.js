const axios = require('axios');

async function testApi() {
    try {
        console.log('Sending request to http://localhost:5000/api/start-analysis...');
        const response = await axios.post('http://localhost:5000/api/start-analysis', {
            country: 'Germany',
            industry: 'Cars',
            companyType: 'startup',
            budget: '10k-50k'
        });
        console.log('✅ Response Status:', response.status);
        console.log('📄 Response Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testApi();
