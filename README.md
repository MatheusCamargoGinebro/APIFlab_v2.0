# IFLab - Aplicativo de gestão de laboratório de química do Instituto Federal Campus Campinas

### Descrição do projeto

> O IFLab é uma plataforma de gerenciamento dos laboratórios do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP) - Campus Campinas. Este software oferece uma ampla gama de funcionalidades, incluindo a administração segura dos elementos e equipamentos presentes nos laboratórios de química do instituto. Além disso, dispõe de recursos para a reserva desses espaços, prevenindo conflitos de horários entre os usuários.
> A primeira versão do projeto, concluída em 2024, teve como principal objetivo a implementação de uma interface gráfica voltada para computadores desktops. Já a segunda versão, prevista para 2025, trará aprimoramentos significativos, como um sistema de back-end mais robusto e seguro, uma versão mobile do aplicativo e melhorias na interface gráfica para desktops.

### Desenvolvedores

> [Bianca Ferreira de Santana Lochetti](https://github.com/BiancaLochetti)\
>  [Lucas Haiter Leoni](https://github.com/lucashaiter)\
>  [Mateus Rodrigues Martins](https://github.com/shimetsu3)\
>  [Matheus Camargo Ginebro](https://github.com/MatheusCamargoGinebro)

### Repositórios

> [API](https://github.com/MatheusCamargoGinebro/APIFlab_v2.0)\
>  [Interface](https://github.com/BiancaLochetti/iflabInterface)

## Iniciando o sistema

> [!NOTE]
> O sistema ainda está em desenvolvimento, e qualquer erro poderá ser notificado para que possamos resolver. Para o funcionamento correto e satisfatório, é necessário que tanto a API quanto a interface estejam rodando ao mesmo tempo.

### 1. Requisitos para a API

Para o funcionamento correto da API, alguns requisitos devem ser cumpridos:

> 1.1 A biblioteca open source [OpenSSL](https://openssl-library.org/source/) precisa estar instalada e configurada no seu ambiente;\
>  1.2 o arquivo .env precisa ser criado e configurado. Para mais detalhes sobre o que colocar nesse arquivo, entrar em contato com qualquer um dos desenvolvedores.

### 2. Iniciando a API

Após clonar o [repositório da API](https://github.com/MatheusCamargoGinebro/APIFlab_v2.0), faça os seguintes passos:

1 - Rode os arquivos `database.sql` e `inserts.sql`, localizado na pasta database;\
2 - É necessário que sejam rodados os seguintes comandos no terminal do vscode, estando no diretório da API:

```bash
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

### 3. Requisitos para a interface

Para o funcionamento da interface do IFLab, é necessário que:

> 3.1 A API esteja rodando sem erros em um IP aberto;\
>  3.2 Seja especificado no arquivo **settings.js** qual é o IP atual da API;\
>  3.3 Tanto o **React Native** quanto o **expo** estejam instalados no seu sistema;\
>  3.4 Caso queira rodar o app no celular:\
>  3.4.1 Se no android, deve-se instalar o aplicativo **Expo Go** e ler o QRCode;\
>  3.4.2 Se no IOS, utilizar a câmera do celular para ler o QRCode.

### 4. Iniciando a interface

Após clonar o [repositório da interface](https://github.com/BiancaLochetti/iflabInterface), utilize os comandos a seguir para iniciar o app:

```
npm i
npm run start
```

Será gerado um `QRCode` que deve ser lido pelo celular. Alternativamente, também é possível pressionar a tecla `w`, para abrir o sistema na web.

## Diagramas

### Diagrama de entidade e relacionamento (DER)

![Diagrama de entidade e relacionamento (DER)](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/der.drawio.png)

<hr>

### Diagrama de caso de uso (useCase)

![Diagrama de caso de uso (useCase)](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/usecase.drawio.png)

<hr>

### Diagrama Model-View-Controller (MVC)

![Diagrama Model-View-Controller (MVC) ](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/MVC%20diagram.png)

<hr>

### Fluxograma do usuário administrador

![Fluxograma do usuário administrador](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/fluxograma.png)

<hr>

## Rotas disponíveis

### Campus

#### List Campus

> **Method:** `GET`\
> **Route:** `<api_ip>/campus/get`\
> **Token:** não requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     campusList : [
          {
                campusName,
                campusId
          },
          ...
      ]
}
```

<hr>

#### Register new Campus

> **Method:** `POST`\
> **Route:** `<api_ip>/campus/register`\
> **Token:** não requer

Entrada:

```ruby
{
     campus_name,
     campus_uf
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

### Usuários

#### Login user

> **Method:** `POST`\
> **Route:** `<api_ip>/users/login`\
> **Token:** não requer

Entrada:

```ruby
{
      user_email,
      user_password,
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Logout user

> **Method:** `POST`\
> **Route:** `<api_ip>/users/logout`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Email Validation

> **Method:** `POST`\
> **Route:** `<api_ip>/users/email/getcode`\
> **Token:** não requer

Entrada:

```ruby
{
    user_email,
    reason_for_code
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Email Code Validation

> **Method:** `POST`\
> **Route:** `<api_ip>/users/email/validate`\
> **Token:** não requer

Entrada:

```ruby
{
    user_email,
    user_validation_code
}
```

Saída:

```ruby
{
     status,
     msg,
     authToken
}
```

<hr>

#### Password Recovery

> **Method:** `POST`\
> **Route:** `<api_ip>/users/password/recovery`\
> **Token:** não requer

Entrada:

```ruby
{
     user_email,
     user_validation_code,
     user_password
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Register User

> **Method:** `POST`\
> **Route:** `<api_ip>/users/register`\
> **Token:** requer `user_creation_token`

Entrada:

```ruby
{
     user_email,
     user_name,
     user_password,
     user_creation_token,
     campus_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit user's name

> **Method:** `PUT`\
> **Route:** `<api_ip>/users/edit/name`\
> **Token:** requer

Entrada:

```ruby
{
     user_name
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit user's email

> **Method:** `POST`\
> **Route:** `<api_ip>/users/edit/email`\
> **Token:** requer

Entrada:

```ruby
{
     user_email,
     user_validation_code
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit user's password

> **Method:** `PUT`\
> **Route:** `<api_ip>/users/edit/password`\
> **Token:** requer

Entrada:

```ruby
{
     user_password
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit user's image

> **Method:** `PUT`\
> **Route:** `<api_ip>/users/edit/image`\
> **Token:** requer

Entrada:

```ruby
{
     user_image
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Get user informations

> **Method:** `GET`\
> **Route:** `<api_ip>/users/info`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     data: {
         user_id,
         user_name,
         user_email,
         user_type,
         user_access_level,
         user_image,
         campus_id
     }
}
```

<hr>

### Laboratórios

#### Register new laboratory

> **Method:** `POST`\
> **Route:** `<api_ip>/labs/register`\
> **Token:** requer

Entrada:

```ruby
{
   lab_name
}
```

Saída:

```ruby
{
   status,
   msg
}
```

<hr>

#### Delete a laboratory

> **Method:** `DELETE`\
> **Route:** `<api_ip>/labs/delete`\
> **Token:** requer

Entrada:

```ruby
{
   lab_id
}
```

Saída:

```ruby
{
   status,
   msg
}
```

<hr>

#### List user's laboratories

> **Method:** `GET`\
> **Route:** `<api_ip>/labs/my`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     labsList: [
          {
                labId,
                labName,
                userLevel,
                inFocusSession: {
                     sessionTime,
                     user
                }
          },
          ...
     ]
}
```

<hr>

#### List laboratory's schedule

> **Method:** `GET`\
> **Route:** `<api_ip>/labs/schedule/<labId>/<date>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     scheduleList: [
          {
                startsAt,
                endsAt,
                date,
                responsable,
                elementsQtd,
                equipmentsQtd
          },
          ...
     ]
}
```

<hr>

#### Get lab users

> **Method:** `GET`\
> **Route:** `<api_ip>/labs/users/<labId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     usersList: [
          {
                 userName,
                 userType,
                 profilePic,
                 adminLevel
          },
          ...
     ]
 }
```

<hr>

#### Change user admin level

> **Method:** `PUT`\
> **Route:** `<api_ip>/labs/admin`\
> **Token:** requer

Entrada:

```ruby
{
    user_id,,
    lab_id,
    user_admin_level
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Add user to lab

> **Method:** `POST`\
> **Route:** `<api_ip>/labs/admin`\
> **Token:** requer

Entrada:

```ruby
{
    user_email,
    lab_id,
    user_admin_level
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Remove user from lab

> **Method:** `DELETE`\
> **Route:** `<api_ip>/labs/admin`\
> **Token:** requer

Entrada:

```ruby
{
    user_id,
    lab_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

### Elementos

#### Register element

> **Method:** `POST`\
> **Route:** `<api_ip>/elements/register`\
> **Token:** requer

Entrada:

```ruby
{
     element_name,
     element_image,
     element_molar_mass,
     element_quantity,
     element_cas_number,
     element_ec_number,
     element_admin_level,
     element_validity,
     element_physical_state,
     lab_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Delete element

> **Method:** `DELETE`\
> **Route:** `<api_ip>/elements/delete`\
> **Token:** requer

Entrada:

```ruby
{
    element_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### List laboratory's elements

> **Method:** `GET`\
> **Route:** `<api_ip>/elements/lab/<labId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     elementsList: [
          {
                name,
                cas,
                ec,
                validity,
                quantity
          },
          ...
     ]
}
```

<hr>

#### Get session’s elements

> **Method:** `GET`\
> **Route:** `<api_ip>/elements/session/<sessionId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     elements: [
           {
                elementId,
                name,
                quantitiy,
                 physicalState
           },
           ...
     ]
 }
```

<hr>

#### Get elements info

> **Method:** `GET`\
> **Route:** `<api_ip>/elements/info/<elementId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     element: {
           elementId,
           name,
           image,
           molarMass
           quantity,
           cas,
           ec,
           adminLevel,
           validity
     }
 }
```

<hr>

#### Edit element name

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/name`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_name
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element quantity

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/quantity`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_quantity
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element CAS

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/cas`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_cas_number
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element EC

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/ec`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_ec_number
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element physical state

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/state`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_physical_state
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element validity

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/validity`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_validity
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element administrator

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/admin`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_admin_level
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element molarmass

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/molarmass`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_molar_mass
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit element image

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/image`\
> **Token:** requer

Entrada:

```ruby
{
    element_id,
    element_image
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

### Equipamentos

#### Register equipment

> **Method:** `POST`\
> **Route:** `<api_ip>/equipments/register`\
> **Token:** requer

Entrada:

```ruby
{
   lab_id,
   equipment_name,
   equipment_image,
   equipment_description,
   equipment_quantity,
   equipment_quality,
   equipment_admin_level
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Delete equipments

> **Method:** `DELETE`\
> **Route:** `<api_ip>/equipments/delete`\
> **Token:** requer

Entrada:

```ruby
{
    equipment_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### List laboratory’s equipments

> **Method:** `GET`\
> **Route:** `<api_ip>/equipments/lab/<labId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     equipmentsList: [
          {
               name,
               quantity,
               elementId,
               quality
          },
          ...
     ]
}
```

<hr>

#### List session’s equipment

> **Method:** `GET`\
> **Route:** `<api_ip>/equipments/session/<labId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     equipmentsList: [
          {
                name,
                quantity,
                equipmentId
          },
          ...
     ]
 }
```

<hr>

#### Get equipment info

> **Method:** `GET`\
> **Route:** `<api_ip>/equipments/info/<equipmentId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     equipmentInfo: {
           equipmentId,
           labId,
           newName,
           newImage
           newQuantity,
           quality,
           newDescription,
           adminLevel,
     }
 }
```

<hr>

#### Edit equipment name

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/name`\
> **Token:** requer

Entrada:

```ruby
{
   equipment_id,
   equipment_name
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit equipment quantity

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/quantity`\
> **Token:** requer

Entrada:

```ruby
{
   equipment_id,
   equipment_quantity
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit equipment quality

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/quality`\
> **Token:** requer

Entrada:

```ruby
{
   equipment_id,
   equipment_quality
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit equipment description

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/description`\
> **Token:** requer

Entrada:

```ruby
{
   equipment_id,
   equipment_description
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit equipment administrator

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/admin`\
> **Token:** requer

Entrada:

```ruby
{
   equipment_id,
   equipment_admin_level
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Edit equipment image

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/image`\
> **Token:** requer

Entrada:

```ruby
{
   equipment_id,
   equipment_image
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

### Sessões

#### Create a new session

> **Method:** `POST`\
> **Route:** `<api_ip>/sessions/create`\
> **Token:** requer

Entrada:

```ruby
{
     lab_id,
     session_date,
     session_starts_at,
     session_ends_at,
     elements_list: [
          {
                element_id,
                element_quantity
          },
          ...
     ],
     equipments_list: [
          {
                equipment_id
          },
          ...
     ]
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Delete a session

> **Method:** `DELETE`\
> **Route:** `<api_ip>/sessions/delete`\
> **Token:** requer

Entrada:

```ruby
{
     session_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Start a session

> **Method:** `PUT`\
> **Route:** `<api_ip>/sessions/start`\
> **Token:** requer

Entrada:

```ruby
{
     session_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### Finish a session

> **Method:** `PUT`\
> **Route:** `<api_ip>/sessions/finish`\
> **Token:** requer

Entrada:

```ruby
{
     session_id
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>

#### List user's sessions

> **Method:** `GET`\
> **Route:** `<api_ip>/sessions/mysessions`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     sessionsList: [
          {
               sessionId,
               labName,
               date,
               elementsQtd,
               equipmentsQtd,
               formDone
          },
          ...
     ]
}
```

<hr>

#### Get utilization forms

> **Method:** `GET`\
> **Route:** `<api_ip>/sessions/form/<sessionId>`\
> **Token:** requer

Entrada:

```ruby
{}
```

Saída:

```ruby
{
     status,
     msg,
     elements: [
          {
                elementId
          },
          ...
     ]
}
```

<hr>

#### Save utilization forms

> **Method:** `PUT`\
> **Route:** `<api_ip>/sessions/form/set`\
> **Token:** requer

Entrada:

```ruby
{
     sessionId,
     elements_list: [
          {
                element_id,
                element_quantity
          },
          ...
     ]
}
```

Saída:

```ruby
{
     status,
     msg
}
```

<hr>
