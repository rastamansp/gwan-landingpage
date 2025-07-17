const axios = require('axios');

async function testOpenAI() {
  try {
    console.log('🧪 Testando integração com OpenAI...');
    
    // 1. Fazer login para obter token
    console.log('1. Fazendo login...');
    const loginResponse = await axios.post('http://localhost:3001/auth/login-request', {
      contact: 'pedro.hp.almeida@gmail.com'
    });
    
    console.log('✅ Login realizado:', loginResponse.data);
    
    // 2. Ativar usuário
    console.log('2. Ativando usuário...');
    const activateResponse = await axios.post(`http://localhost:3001/auth/activate/${loginResponse.data.userId}`, {
      activationCode: loginResponse.data.activationCode
    });
    
    console.log('✅ Usuário ativado:', activateResponse.data);
    
    const token = activateResponse.data.token;
    
    // 3. Testar processamento de imagem
    console.log('3. Testando processamento de imagem...');
    const processResponse = await axios.post('http://localhost:3001/upload/process', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Processamento realizado:');
    console.log('Success:', processResponse.data.success);
    console.log('Message:', processResponse.data.message);
    
    if (processResponse.data.analysis) {
      console.log('📊 Análise do personagem:');
      console.log('Nome:', processResponse.data.analysis.identidade?.nome);
      console.log('Idade:', processResponse.data.analysis.identidade?.idade);
      console.log('Gênero:', processResponse.data.analysis.identidade?.genero);
      console.log('Confiança:', processResponse.data.analysis.metadata?.confianca);
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

testOpenAI(); 