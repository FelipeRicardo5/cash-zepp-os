# Zepp OS - Cash | software para controle de gastos.

## O que é Zepp OS?

Zepp OS é o sistema operacional desenvolvido para smartwatches da linha Amazfit (como Amazfit Bip 6, GTR, GTS, entre outros). É um OS otimizado para hardware limitado, focado em "eficiência energética e performance em dispositivos vestíveis."

## Arquitetura e Estrutura

### Framework
O Zepp OS utiliza um framework próprio para desenvolvimento de aplicações chamadas **MiniPrograms**. Estes MiniPrograms são aplicações leves que podem funcionar de forma:
- **Independente**: Executam apenas no relógio, sem necessidade de conexão com smartphone
- **Conectada**: Podem se comunicar com apps companion no celular quando necessário

### Estrutura de Pastas
O framework possui uma organização específica de diretórios que segue boas práticas de desenvolvimento para ambientes com recursos limitados.

## Ferramentas de Desenvolvimento

### 1. Zeus CLI (Command Line Interface)

Ferramenta de linha de comando essencial para o desenvolvimento em Zepp OS.

**Principais funcionalidades:**
- Criação de novos projetos MiniProgram
- Build e compilação de aplicações
- Gerenciamento de dependências
- Deploy de aplicações para o dispositivo
- Automação de tarefas de desenvolvimento

**Instalação:**
```bash
npm install -g @zeppos/zeus-cli
```

**Comandos básicos:**
```bash
# Criar novo projeto
zeus create cash-zepp-os

# Build do projeto
zeus build

# Preview no simulador
zeus preview
```

### 2. Simulator Zepp

Ambiente de simulação que permite testar MiniPrograms sem necessidade de um dispositivo físico.

**Características:**
- Emula diferentes modelos de smartwatches Amazfit
- Simula interações de tela (touch, swipe, botões)
- Permite debug em tempo real
- Visualização de logs e erros
- Testes de performance e consumo de recursos

**Vantagens:**
- Desenvolvimento mais rápido (sem necessidade de transfer para dispositivo)
- Testes em múltiplos dispositivos virtuais
- Debug facilitado com ferramentas de desenvolvedor

## Boas Práticas

### Performance
- Otimizar para hardware limitado (memória e processamento)
- Minimizar uso de recursos para preservar bateria
- Código eficiente e enxuto

### Interface
- Design adaptado para telas pequenas
- Navegação simplificada e intuitiva
- Considerar usabilidade com uma mão

### Desenvolvimento
- Seguir a estrutura de pastas recomendada
- Documentar código e funcionalidades
- Testar em simulador antes de deploy

## Fluxo de Desenvolvimento

1. **Planejamento**: Definir features e documentação do projeto
2. **Setup**: Configurar ambiente com Zeus CLI e Simulator
3. **Desenvolvimento**: Codificar seguindo boas práticas do framework
4. **Testes**: Validar no Simulator Zepp
5. **Deploy**: Instalar no dispositivo físico para testes finais
6. **Release**: Publicar MiniProgram

## Recursos

- Documentação oficial do Zepp OS
- Comunidade de desenvolvedores
- Exemplos de MiniPrograms
- APIs disponíveis para acesso a sensores e funcionalidades do relógio

---

## Sobre este Guia

Este README foi criado com base no desenvolvimento de um MiniProgram de controle de gastos para Amazfit Bip 6, representando a jornada de aprendizado e implementação prática das ferramentas Zepp OS.

---

**Nota:** Este é um guia introdutório baseado em experiência prática de desenvolvimento. Para informações técnicas detalhadas, consulte a documentação oficial do Zepp OS.

---

Quer que eu expanda alguma seção específica ou adicione mais detalhes técnicos sobre alguma ferramenta?
