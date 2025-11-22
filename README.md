# Instruções de Execução do Projeto Ulbra Lordsz ERP

Este documento fornece instruções passo a passo sobre como configurar e executar o aplicativo móvel Ulbra Lordsz ERP.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

1.  **Node.js**: Versão LTS recomendada.
2.  **npm** ou **yarn**: Gerenciador de pacotes.
3.  **Expo CLI**: Ferramenta de linha de comando do Expo.
    *   Instale globalmente com: `npm install -g expo-cli`
4.  **Aplicativo Expo Go**: Instale em seu dispositivo móvel (Android ou iOS) através da loja de aplicativos.

## Configuração do Projeto

1.  **Navegue até a pasta do projeto**:
    Abra seu terminal e vá para o diretório do aplicativo:
    ```bash
    cd LordszApp
    ```

2.  **Instale as dependências**:
    Execute o comando abaixo para instalar todas as bibliotecas necessárias:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Executando o Aplicativo

1.  **Inicie o servidor de desenvolvimento**:
    No terminal, dentro da pasta `LordszApp`, execute:
    ```bash
    npx expo start
    ```

2.  **Abra no seu dispositivo**:
    *   Você verá um QR Code no terminal.
    *   Abra o aplicativo **Expo Go** no seu celular.
    *   **Android**: Use a opção "Scan QR Code" no Expo Go e aponte para o código no terminal.
    *   **iOS**: Abra o aplicativo Câmera padrão e aponte para o QR Code. Toque na notificação para abrir no Expo Go.

3.  **Emuladores (Opcional)**:
    *   Se preferir usar um emulador Android ou simulador iOS no computador, pressione `a` (para Android) ou `i` (para iOS) no terminal após iniciar o Expo.

## Instalação via APK (Android)

Para testar o aplicativo diretamente em um dispositivo Android sem precisar configurar o ambiente de desenvolvimento:

1.  Acesse a aba **Releases** neste repositório do GitHub.
2.  Baixe o arquivo `.apk` da versão mais recente (ex: `Ulbra-Lordsz-ERP.apk`).
3.  Transfira o arquivo para o seu celular.
4.  Toque no arquivo para instalar.
    *   *Nota*: Pode ser necessário habilitar a instalação de fontes desconhecidas nas configurações do seu Android.

## Funcionalidades Principais

*   **Login**: Tela inicial de acesso.
*   **Dashboard**: Lista de veículos e status.
*   **Controle de Pneus**: Selecione um veículo para ver seus pneus.
*   **Detalhes do Pneu**: Visualize informações detalhadas, histórico e flags de status.
*   **Ações**: Realize ações como rotacionar, reparar, enviar para estoque, etc.
*   **Escanear**: Use a câmera para ler QR Codes de pneus e acessar rapidamente seus detalhes.

## Solução de Problemas Comuns

*   **Erro de Câmera**: Se a câmera não abrir, verifique se você concedeu permissão de uso da câmera ao aplicativo Expo Go.
*   **Erro de Conexão**: Certifiquese de que seu celular e computador estejam na mesma rede Wi-Fi.
*   **Erro de Cache/Bundling**: Se houver erros de construção, tente limpar o cache:
    ```bash
    npx expo start -c
    ```

---
Desenvolvido para Ulbra Lordsz ERP.
