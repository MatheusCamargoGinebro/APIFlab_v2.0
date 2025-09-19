# IFLab - Aplicativo de gestão de laboratório de química do Instituto Federal Campus Campinas

### Descrição do projeto
> O IFLab é uma plataforma de gerenciamento dos laboratórios do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP) - Campus Campinas. Este software oferece uma ampla gama de funcionalidades, incluindo a administração segura dos elementos e equipamentos presentes nos laboratórios de química do instituto. Além disso, dispõe de recursos para a reserva desses espaços, prevenindo conflitos de horários entre os usuários.
A primeira versão do projeto, concluída em 2024, teve como principal objetivo a implementação de uma interface gráfica voltada para computadores desktops. Já a segunda versão, prevista para 2025, trará aprimoramentos significativos, como um sistema de back-end mais robusto e seguro, uma versão mobile do aplicativo e melhorias na interface gráfica para desktops.

### Desenvolvedores

>  [Bianca Ferreira de Santana Lochetti](https://github.com/BiancaLochetti)\
   [Lucas Haiter Leoni](https://github.com/lucashaiter)\
   [Mateus Rodrigues Martins](https://github.com/shimetsu3)\
   [Matheus Camargo Ginebro](https://github.com/MatheusCamargoGinebro)

### Repositórios

>  [API](https://github.com/MatheusCamargoGinebro/APIFlab_v2.0)\
   [Interface](https://github.com/BiancaLochetti/iflabInterface)

## Iniciando o sistema

> [!WARNING]
> O sistema ainda está em desenvolvimento, e qualquer erro poderá ser notificado para que possamos resolver. Para o funcionamento correto e satisfatório, é necessário que tanto a API quanto a interface estejam rodando ao mesmo tempo.

#### 1. Requisitos para a API

 Para o funcionamento correto da API, alguns requisitos devem ser cumpridos:
 > 1.1 A biblioteca open source [OpenSSL](https://openssl-library.org/source/) precisa estar instalada e configurada no seu ambiente;\
  1.2 o arquivo .env precisa ser criado e configurado. Para mais detalhes sobre o que colocar nesse arquivo, entrar em contato com qualquer um dos desenvolvedores.

#### 2. Iniciando a API

Após clonar o [repositório da API](https://github.com/MatheusCamargoGinebro/APIFlab_v2.0), é necessário que sejam rodados os seguintes comandos no terminal do vscode, estando no diretório da API:
```
npm i
npm run cert
npm run start
```

Caso o terminal exiba a seguinte mensagem, a API iniciou corretamente:

```bash
[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node /src/services/server.js src/services/server.js`
HTTPS server running at https://192.168.0.51:3333
```

> [!warning]
> O endereço IP exibido na mensagem do terminal será o mesmo endereço IP da máquina que você estiver utilzando para rodar a API. Para o melhor funcionamento do sistema, a porta :3333 precisa obrigaróriamente estar aberta.

#### 3. Requisitos para a interface

Para o funcionamento da interface do IFLab, é necessário que:

> 3.1 A API esteja rodando sem erros em um IP aberto;\
  3.2 Seja especificado no arquivo **settings.js** qual é o IP atual da API;\
  3.3 Tanto o React Native quanto o expo estejam instalados no seu sistema\;
  3.4 Caso queira rodar a app no celular:\
      - 3.4.1 Se no android, deve-se instalar o aplicativo **Expo Go** e ler o QRCode;\
      - 3.4.2 Se no IOS, utilizar a câmera do celular para ler  o QRCode.

#### 4 Iniciando a interface

