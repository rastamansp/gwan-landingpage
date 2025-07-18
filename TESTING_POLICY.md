# 🧪 Política de Testes - Gwan Landing Page

## 📋 Visão Geral

Este documento define a política de testes obrigatória para o projeto Gwan Landing Page. **Testes são fundamentais para a qualidade do código e devem ser executados antes de qualquer commit, push ou merge**.

---

## 🎯 Princípios Fundamentais

### 1. Testes São Obrigatórios

- **NUNCA** suba código sem testes passando
- **NUNCA** faça merge sem testes passando
- **NUNCA** faça deploy sem testes passando
- **Testes quebrados = Bug** - Corrija antes de continuar

### 2. Cobertura Mínima

- **Meta**: 80% de cobertura de testes
- **Mínimo aceitável**: 70% de cobertura
- **Ideal**: 90%+ de cobertura

### 3. Qualidade dos Testes

- **Testes devem ser legíveis** e auto-documentados
- **Testes devem ser rápidos** (máximo 30 segundos)
- **Testes devem ser isolados** (não dependem de outros)
- **Testes devem ser determinísticos** (mesmo resultado sempre)

---

## 🔄 Fluxo de Trabalho com Testes

### Antes de Cada Commit

```bash
# 1. Execute lint
npm run lint

# 2. Execute build
npm run build

# 3. Execute testes
npm run test

# 4. Execute dev para validar
npm run dev

# 5. Se tudo passar, faça o commit
git add .
git commit -m "feat: sua mensagem de commit"
```

### Antes de Cada Push

```bash
# 1. Execute todos os testes
npm run test

# 2. Verifique cobertura
npm run test:coverage

# 3. Se tudo passar, faça o push
git push origin sua-branch
```

### Antes de Cada Merge

```bash
# 1. Execute testes completos
npm run test

# 2. Verifique cobertura
npm run test:coverage

# 3. Execute testes de integração
npm run test:integration

# 4. Se tudo passar, faça o merge
```

---

## 📊 Comandos de Teste

### Comandos Principais

```bash
# Todos os testes
npm run test

# Testes do backend
npm run test:backend

# Testes do frontend
npm run test:frontend

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch

# Testes de integração
npm run test:integration
```

### Comandos Específicos

```bash
# Testes de um arquivo específico
npm test -- --testPathPattern=login-form.test.tsx

# Testes com verbose
npm test -- --verbose

# Testes com coverage detalhado
npm run test:coverage -- --coverageReporters=text-lcov
```

---

## 🏗️ Estrutura de Testes

### Backend (NestJS)

```
backend/
├── src/
│   ├── modules/
│   │   └── auth/
│   │       ├── application/
│   │       │   └── use-cases/
│   │       │       └── __tests__/          # Testes de use cases
│   │       ├── infrastructure/
│   │       │   └── __tests__/              # Testes de infraestrutura
│   │       └── presentation/
│   │           └── __tests__/              # Testes de controllers
│   └── __tests__/                          # Testes de integração
```

### Frontend (React)

```
frontend/
├── src/
│   ├── modules/
│   │   └── auth/
│   │       ├── application/
│   │       │   └── __tests__/              # Testes de use cases
│   │       ├── infrastructure/
│   │       │   └── __tests__/              # Testes de serviços
│   │       └── presentation/
│   │           └── components/
│   │               └── __tests__/          # Testes de componentes
│   └── __tests__/                          # Testes de integração
```

---

## 📝 Padrões de Teste

### 1. Nomenclatura

```typescript
// ✅ Correto
describe('LoginForm', () => {
  it('should render login form correctly', () => {
    // teste
  });

  it('should handle login submission successfully', () => {
    // teste
  });
});

// ❌ Incorreto
describe('LoginForm', () => {
  it('test', () => {
    // teste
  });
});
```

### 2. Estrutura AAA (Arrange, Act, Assert)

```typescript
describe('RegisterUserUseCase', () => {
  it('should register user successfully', async () => {
    // Arrange
    const mockRepository = createMockRepository();
    const mockNotificationService = createMockNotificationService();
    const useCase = new RegisterUserUseCase(mockRepository, mockNotificationService);
    
    // Act
    const result = await useCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+5511999999999'
    });
    
    // Assert
    expect(result.success).toBe(true);
    expect(mockRepository.save).toHaveBeenCalled();
    expect(mockNotificationService.sendCode).toHaveBeenCalled();
  });
});
```

### 3. Mocks e Stubs

```typescript
// ✅ Correto - Mock específico
const mockAuthService = {
  login: jest.fn().mockResolvedValue({ success: true, token: 'mock-token' }),
  register: jest.fn().mockResolvedValue({ success: true, userId: 'mock-user-id' })
};

// ❌ Incorreto - Mock genérico
const mockAuthService = jest.fn();
```

---

## 🎯 Tipos de Teste

### 1. Testes Unitários

- **O que testar**: Funções, classes, métodos isolados
- **Cobertura**: 100% das funções críticas
- **Velocidade**: Rápidos (< 1 segundo cada)
- **Isolamento**: Sem dependências externas

### 2. Testes de Integração

- **O que testar**: Interação entre módulos
- **Cobertura**: Fluxos principais
- **Velocidade**: Médios (< 5 segundos cada)
- **Isolamento**: Com dependências controladas

### 3. Testes E2E (Futuro)

- **O que testar**: Fluxos completos do usuário
- **Cobertura**: Cenários críticos
- **Velocidade**: Lentos (< 30 segundos cada)
- **Isolamento**: Com ambiente completo

---

## 📈 Métricas de Qualidade

### Cobertura de Código

```bash
# Verificar cobertura
npm run test:coverage

# Resultado esperado
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   85.71 |    83.33 |   87.50 |   85.71 |
```

### Qualidade dos Testes

- **Testes devem ser legíveis**
- **Testes devem ser rápidos**
- **Testes devem ser determinísticos**
- **Testes devem ser isolados**

---

## 🚨 Cenários de Falha

### 1. Testes Quebrados

```bash
# Se testes quebram, NÃO continue
npm test
# ❌ FAIL: 2 tests failed

# Corrija os testes primeiro
# Depois continue com o desenvolvimento
```

### 2. Cobertura Baixa

```bash
# Se cobertura está baixa
npm run test:coverage
# ❌ Coverage: 65% (meta: 80%)

# Adicione testes para aumentar cobertura
# Depois continue com o desenvolvimento
```

### 3. Testes Lentos

```bash
# Se testes estão lentos
npm test
# ⏱️ Time: 45.123s (meta: < 30s)

# Otimize os testes
# Depois continue com o desenvolvimento
```

---

## 🔧 Configuração de Testes

### Jest Configuration (Backend)

```javascript
// jest.config.js
module.exports = {
  preset: '@nestjs/testing',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.entity.ts',
    '!src/main.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Jest Configuration (Frontend)

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## 📚 Recursos de Aprendizado

### Documentação

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

### Boas Práticas

- **Teste comportamento, não implementação**
- **Use descrições claras**
- **Mantenha testes simples**
- **Evite testes frágeis**

---

## ✅ Checklist de Qualidade

### Antes de Cada Commit

- [ ] **Lint**: `npm run lint` sem erros
- [ ] **Build**: `npm run build` sem erros
- [ ] **Testes**: `npm run test` - todos passando
- [ ] **Cobertura**: Verificar se não diminuiu
- [ ] **Dev**: `npm run dev` roda sem problemas

### Antes de Cada Push

- [ ] **Testes**: `npm run test` - todos passando
- [ ] **Cobertura**: `npm run test:coverage` - acima de 80%
- [ ] **Integração**: `npm run test:integration` - todos passando

### Antes de Cada Merge

- [ ] **Testes**: `npm run test` - todos passando
- [ ] **Cobertura**: `npm run test:coverage` - acima de 80%
- [ ] **Qualidade**: Revisar qualidade dos testes

---

**Lembre-se**: **Testes são a base da qualidade do código. Nunca comprometa a qualidade dos testes em favor de velocidade de desenvolvimento.**

---

**Última atualização**: Novembro 2025  
**Versão**: 1.0.0  
**Status**: ✅ Implementado e Ativo
