const fetch = require('node-fetch');

async function testAuth() {
  console.log('🧪 Testando autenticação...\n');

  try {
    // 1. Registrar usuário
    console.log('1️⃣ Registrando usuário...');
    const registerResponse = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+5511999999999'
      })
    });

    const registerData = await registerResponse.json();
    console.log('✅ Registro:', registerData);

    if (!registerData.success) {
      throw new Error('Falha no registro');
    }

    // 2. Ativar usuário
    console.log('\n2️⃣ Ativando usuário...');
    const activateResponse = await fetch(`http://localhost:3001/auth/activate/${registerData.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activationCode: registerData.activationCode
      })
    });

    const activateData = await activateResponse.json();
    console.log('✅ Ativação:', activateData);

    if (!activateData.success) {
      throw new Error('Falha na ativação');
    }

    const token = activateData.token;
    console.log('🔑 Token gerado:', token.substring(0, 50) + '...');

    // 3. Testar endpoint protegido
    console.log('\n3️⃣ Testando endpoint protegido...');
    const meResponse = await fetch('http://localhost:3001/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const meData = await meResponse.json();
    console.log('✅ Endpoint /me:', meData);

    if (!meData.success) {
      throw new Error('Falha na autenticação');
    }

    // 4. Testar upload (simulado)
    console.log('\n4️⃣ Testando upload...');
    const uploadResponse = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    console.log('📤 Upload status:', uploadResponse.status);
    
    if (uploadResponse.status === 401) {
      console.log('❌ Upload falhou - Token inválido');
    } else {
      console.log('✅ Upload funcionando');
    }

    console.log('\n🎉 Teste concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

// Aguardar um pouco para o servidor inicializar
setTimeout(testAuth, 3000); 