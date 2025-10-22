# IFLab - Aplicativo de gestão de laboratório de química do Instituto Federal Campus Campinas

![API](https://img.shields.io/badge/API-Node.js%2FExpress-red?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Interface](https://img.shields.io/badge/Interface-React%20Native-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Done-green?style=for-the-badge)

O IFLab é uma plataforma de gerenciamento dos laboratórios do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP) - Campus Campinas. Este software oferece uma ampla gama de funcionalidades, incluindo a administração segura dos elementos e equipamentos presentes nos laboratórios de química do instituto. Além disso, dispõe de recursos para a reserva desses espaços, prevenindo conflitos de horários entre os usuários.

## 🧑‍💻 Desenvolvedores

> [Bianca Ferreira de Santana Lochetti](https://github.com/BiancaLochetti)\
>  [Lucas Haiter Leoni](https://github.com/lucashaiter)\
>  [Mateus Rodrigues Martins](https://github.com/shimetsu3)\
>  [Matheus Camargo Ginebro](https://github.com/MatheusCamargoGinebro)

## 📂 Repositórios

> [API](https://github.com/MatheusCamargoGinebro/APIFlab_v2.0)\
>  [Interface](https://github.com/BiancaLochetti/iflabInterface)

## 🚀 Iniciando o sistema

> [!NOTE]
> O sistema ainda está em desenvolvimento, e qualquer erro poderá ser notificado para que possamos resolver. Para o funcionamento correto e satisfatório, é necessário que tanto a API quanto a interface estejam rodando ao mesmo tempo.

### ⚙️ 1. Requisitos para a API

Para o funcionamento correto da API, alguns requisitos devem ser cumpridos:

> 1.1 A biblioteca open source [OpenSSL](https://openssl-library.org/source/) precisa estar instalada e configurada no seu ambiente;\
>  1.2 o arquivo .env precisa ser criado e configurado. Para mais detalhes sobre o que colocar nesse arquivo, entrar em contato com qualquer um dos desenvolvedores.

### 🔄 2. Iniciando a API

Após clonar o [repositório da API](https://github.com/MatheusCamargoGinebro/APIFlab_v2.0), faça os seguintes passos:

1 - Rode os arquivos `database.sql` e `inserts.sql`, localizado na pasta database;\
2 - É necessário que sejam rodados os seguintes comandos no terminal do vscode, estando no diretório da API:

#### 🗃️ Instalar dependências:

```bash
npm i # Instala dependências da API
```

#### 🔓 Rodar em `HTTP`:

Modo desenvolvimento:

```bash
npm run start-dev:http # Rodar em modo desenvolvimento (nodemon);
```

Modo produção:

```bash
npm run start-prod:http # Rodar em modo produção (node);
```

#### 🔒 Rodar em `HTTPS`:

Gerar certificados:

```bash
npm run cert # Para gerar os certificados necessários;
```

Modo desenvolvimento:

```bash
npm run start-dev:https # Rodar em modo desenvolvimento (nodemon);
```

Modo produção:

```bash
npm run start-prod:https # Rodar em modo produção (node);
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

### ⚙️ 3. Requisitos para a interface

Para o funcionamento da interface do IFLab, é necessário que:

> 3.1 A API esteja rodando sem erros em um IP aberto;\
>  3.2 Seja especificado no arquivo **settings.js** qual é o IP atual da API;\
>  3.3 Tanto o **React Native** quanto o **expo** estejam instalados no seu sistema;\
>  3.4 Caso queira rodar o app no celular:\
>  3.4.1 Se no android, deve-se instalar o aplicativo **Expo Go** e ler o QRCode;\
>  3.4.2 Se no IOS, utilizar a câmera do celular para ler o QRCode.

### 🔄 4. Iniciando a interface

Após clonar o [repositório da interface](https://github.com/BiancaLochetti/iflabInterface), utilize os comandos a seguir para iniciar o app:

```
npm i
npm run start
```

Será gerado um `QRCode` que deve ser lido pelo celular. Alternativamente, também é possível pressionar a tecla `w`, para abrir o sistema na `web`.

## 📋 Requisitos do Sistema

### ✅ Requisitos Funcionais

1. **Registro de usuário:** criação de conta com validação de e-mail institucional, senha segura e vínculo ao campus.
2. **Login de usuário:** autenticação via e-mail institucional e senha cadastrada.
3. **Edição de perfil:** atualização de nome, e-mail, senha, foto de perfil e tipo de usuário.
4. **Exibição de laboratórios:** listagem de laboratórios disponíveis de acordo com o nível de permissão do usuário.
5. **Agendamento de sessões:** reserva de horários em laboratório, incluindo elementos e equipamentos necessários.
6. **Inventário do laboratório:** consulta e gerenciamento de elementos e equipamentos, dependendo do nível de acesso.
7. **Gerenciamento de acessos:** controle de permissões de usuários em cada laboratório.
8. **Registro de campus:** cadastro de novos campi e definição do primeiro usuário como administrador.
9. **Novas funcionalidades:** possibilidade de evolução do sistema conforme surgirem novas demandas.

### ⚙️ Requisitos Não Funcionais

1. **Interface e Usabilidade**

   - Interface responsiva e intuitiva, adaptável a diferentes telas e dispositivos.
   - Ações principais (cadastro, login, agendamento) devem ser realizadas sem treinamento prévio.
   - Mensagens de erro, sucesso e validação devem ser claras.

2. **Desempenho**

   - Resposta de operações em até 2 segundos em condições normais de rede.
   - Carregamento de páginas em até 3 segundos.
   - Suporte a no mínimo 20 usuários simultâneos sem degradação perceptível.

3. **Segurança**

   - Senhas criptografadas com algoritmos seguros.
   - Validação de e-mails institucionais para autenticação.
   - Conformidade com a LGPD.
   - Proteção contra ataques como SQL Injection.

4. **Disponibilidade e Confiabilidade**

   - Disponibilidade contínua (24/7) na rede do IFSP - Campus Campinas.
   - Mensagens claras em caso de falha.
   - Backups automáticos diários com retenção mínima de 30 dias.

5. **Compatibilidade**

   - Suporte a dispositivos móveis e telas a partir de 1024x768.
   - Acesso mínimo em mobile, com possibilidade futura de versão desktop (Electron).

6. **Manutenibilidade e Evolução**
   - Código modular, documentado e seguindo boas práticas.
   - Facilidade para adição de novos tipos de usuários, permissões e funcionalidades.

## 🗺️ Diagramas

### Diagrama de entidade e relacionamento (DER)

![Diagrama de entidade e relacionamento (DER)](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/der.drawio.png)

---

### Diagrama de caso de uso (useCase)

![Diagrama de caso de uso (useCase)](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/usecase.drawio.png)

---

### Diagrama Model-View-Controller (MVC)

![Diagrama Model-View-Controller (MVC) ](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/MVC%20diagram.png)

---

### Fluxograma do usuário administrador

![Fluxograma do usuário administrador](https://raw.githubusercontent.com/MatheusCamargoGinebro/APIFlab_v2.0/refs/heads/main/diagrams/fluxograma.png)

---

## 🔗 Rotas disponíveis

### 🏫 Campus

---

#### get_campus_list

> **Method:** `GET`\
> **Route:** `<api_ip>/campus/get`\
> **Token:** não requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Lista de campi obtida com sucesso.",
	"campusList": [
		{
			"campusId": 1,
			"campusName": "IFSP - Campus Campinas"
		}
	]
}
```

---

#### register_new_campus

> **Method:** `POST`\
> **Route:** `<api_ip>/campus/register`\
> **Token:** não requer

Entrada:

```json
{
	"campus_name": "IFSP - Campus Campinas",
	"campus_uf": "SP"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Campus registrado com sucesso."
}
```

---

### 👤 Usuários

---

#### login_user

> **Method:** `POST`\
> **Route:** `<api_ip>/users/login`\
> **Token:** não requer

Entrada:

```json
{
	"user_email": "daniel.rocha@ifsp.edu.br",
	"user_password": "M3g4z0rd@p4ss_w0rd"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Login realizado com sucesso.",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3NjA5NjE1MDgsImV4cCI6MTc2MTA0NzkwOH0.ZS8OnDRRQytKaPXmtRYTPdQbgwJ0Iq9p5tWl43Vl3s4"
}
```

---

#### logout_user

> **Method:** `POST`\
> **Route:** `<api_ip>/users/logout`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Logout realizado com sucesso."
}
```

---

#### email_validation

> **Method:** `POST`\
> **Route:** `<api_ip>/users/email/getcode`\
> **Token:** não requer

> [!IMPORTANT]\
> `reason_for_code = 1` Registra um novo usuário;\
> `reason_for_code = 2` Altera email do usuário;\
> `reason_for_code = 3` Redefine senha do usuário.

Entrada:

```json
{
	"user_email": "matheus@aluno.ifsp.edu.br",
	"reason_for_code": 1
}
```

Saída:

```json
{
	"status": true,
	"msg": "Código de verificação enviado por email."
}
```

---

#### email_code_validation

> **Method:** `POST`\
> **Route:** `<api_ip>/users/email/validate`\
> **Token:** não requer

Entrada:

```json
{
	"user_email": "matheus@aluno.ifsp.edu.br",
	"user_validation_code": "66887"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Código de verificação válido.",
	"authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoibWF0aGV1c0BhbHVuby5pZnNwLmVkdS5iciIsInZlcmlmaWNhdGlvbkNvZGUiOjY2ODg3LCJpYXQiOjE3NjA5NjIwOTEsImV4cCI6MTc2MDk2NTY5MX0.dPUKidjs4xoQTZjFc2OYNyamGTaLFgGlPhZDWUNENCk"
}
```

---

#### password_recovery

> **Method:** `POST`\
> **Route:** `<api_ip>/users/password/recovery`\
> **Token:** não requer

Entrada:

```json
{
	"user_email": "matheus@aluno.ifsp.edu.br",
	"user_validation_code": "80198",
	"user_password": "C4m4rg0vs@pass"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Senha atualizada com sucesso."
}
```

---

#### register_user

> **Method:** `POST`\
> **Route:** `<api_ip>/users/register`\
> **Token:** requer `user_creation_token`

Entrada:

```json
{
	"user_email": "matheus@aluno.ifsp.edu.br",
	"user_password": "senhaT0p@123",
	"user_name": "Matheus Camargo Ginebro",
	"user_creation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoibWF0aGV1c0BhbHVuby5pZnNwLmVkdS5iciIsInZlcmlmaWNhdGlvbkNvZGUiOjY2ODg3LCJpYXQiOjE3NjA5NjIwOTEsImV4cCI6MTc2MDk2NTY5MX0.dPUKidjs4xoQTZjFc2OYNyamGTaLFgGlPhZDWUNENCk",
	"campus_id": 1
}
```

Saída:

```json
{
	"status": true,
	"msg": "Usuário registrado com sucesso."
}
```

---

#### edit_user_name

> **Method:** `PUT`\
> **Route:** `<api_ip>/users/edit/name`\
> **Token:** requer

Entrada:

```json
{
	"user_name": "Matheus Camargo"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Nome do usuário atualizado com sucesso."
}
```

---

#### edit_user_email

> **Method:** `POST`\
> **Route:** `<api_ip>/users/edit/email`\
> **Token:** requer

Entrada:

```json
{
	"user_email": "matheus.ginebro@aluno.ifsp.edu.br",
	"user_validation_code": "35250"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Email atualizado com sucesso."
}
```

---

#### edit_user_password

> **Method:** `PUT`\
> **Route:** `<api_ip>/users/edit/password`\
> **Token:** requer

Entrada:

```json
{
	"user_password": "MyN3wPass_w0rd"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Senha do usuário atualizada com sucesso."
}
```

---

#### edit_user_image

> **Method:** `PUT`\
> **Route:** `<api_ip>/users/edit/image`\
> **Token:** requer

Entrada:

```json
{
	"user_image": "URI-IMAGE"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Imagem do usuário atualizada com sucesso."
}
```

---

#### get_user_info

> **Method:** `GET`\
> **Route:** `<api_ip>/users/info`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"data": {
		"user_id": 4,
		"user_name": "Matheus Camargo",
		"user_email": "matheus.ginebro@aluno.ifsp.edu.br",
		"user_type": "Funcionário",
		"user_access_level": "3",
		"user_image": null,
		"campus_id": 1
	},
	"msg": "Informações do usuário obtidas com sucesso."
}
```

---

### 🚪 Laboratórios

---

#### register_new_laboratory

> **Method:** `POST`\
> **Route:** `<api_ip>/labs/register`\
> **Token:** requer

Entrada:

```json
{
	"lab_name": "A102"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Laboratório registrado com sucesso."
}
```

---

#### delete_laboratory

> **Method:** `DELETE`\
> **Route:** `<api_ip>/labs/delete/<labId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Laboratório deletado com sucesso."
}
```

---

#### list_user_laboratories

> **Method:** `GET`\
> **Route:** `<api_ip>/labs/my`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Laboratórios listados com sucesso.",
	"labsList": [
		{
			"labId": 1,
			"labName": "Lab Química A101",
			"userLevel": "3",
			"status": 0,
			"startsAt": "10:30:00",
			"endsAt": "12:30:00",
			"userName": "Igor Ferreira"
		}
	]
}
```

---

#### list_laboratory_schedule

> **Method:** `GET`\
> **Route:** `<api_ip>/labs/schedule/<labId>/<date>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Horário do laboratório listado com sucesso.",
	"scheduleList": [
		{
			"startsAt": "11:00:00",
			"endsAt": "13:00:00",
			"date": "2025-09-11T03:00:00.000Z",
			"responsable": "Lucas Barros",
			"elementsQtd": "10.00",
			"equipmentsQtd": "2"
		},
		{
			"startsAt": "15:00:00",
			"endsAt": "17:00:00",
			"date": "2025-09-11T03:00:00.000Z",
			"responsable": "Fernanda Alves",
			"elementsQtd": "10.00",
			"equipmentsQtd": "1"
		}
	]
}
```

---

#### get_lab_users

> **Method:** `GET`\
> **Route:** `<api_ip>/labs/users/<labId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Usuários do laboratório listados com sucesso.",
	"usersList": [
		{
			"userName": "Matheus Camargo",
			"userType": "Funcionário",
			"profilePic": null,
			"adminLevel": "3"
		}
	]
}
```

---

#### change_user_admin_level

> **Method:** `PUT`\
> **Route:** `<api_ip>/labs/admin`\
> **Token:** requer

Entrada:

```json
{
	"lab_id": 13,
	"user_id": 1,
	"user_admin_level": 3
}
```

Saída:

```json
{
	"status": true,
	"msg": "Nível de administrador do usuário alterado com sucesso."
}
```

---

#### add_user_to_lab

> **Method:** `POST`\
> **Route:** `<api_ip>/labs/admin`\
> **Token:** requer

Entrada:

```json
{
	"lab_id": 13,
	"user_id": 1,
	"user_admin_level": 1
}
```

Saída:

```json
{
	"status": true,
	"msg": "Usuário adicionado ao laboratório com sucesso."
}
```

---

#### remove_user_from_lab

> **Method:** `DELETE`\
> **Route:** `<api_ip>/labs/admin`\
> **Token:** requer

Entrada:

```json
{
	"lab_id": 13,
	"user_id": 1
}
```

Saída:

```json
{
	"status": true,
	"msg": "Usuário removido do laboratório com sucesso."
}
```

---

### 🧪 Elementos

---

#### register_element

> **Method:** `POST`\
> **Route:** `<api_ip>/elements/register`\
> **Token:** requer

Entrada:

```json
{
	"element_name": "NACL - Sal de cozinha",
	"element_image": "no",
	"element_molar_mass": 1,
	"element_quantity": 100,
	"element_cas_number": "123-321",
	"element_ec_number": "1-222-3551",
	"element_admin_level": 3,
	"element_validity": "2026-01-01",
	"element_physical_state": "Sólido",
	"lab_id": 13
}
```

Saída:

```json
{
	"status": true,
	"msg": "Elemento registrado com sucesso."
}
```

---

#### delete_element

> **Method:** `DELETE`\
> **Route:** `<api_ip>/elements/delete`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 13
}
```

Saída:

```json
{
	"status": true,
	"msg": "Elemento deletado com sucesso."
}
```

---

#### list_lab_elements

> **Method:** `GET`\
> **Route:** `<api_ip>/elements/lab/<labId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Elementos encontrados com sucesso",
	"elementsList": [
		{
			"chemicalId": 14,
			"name": "NACL - Sal de cozinha",
			"quantity": "100.00",
			"molarMass": "1.00",
			"casNumber": "123-321",
			"ecNumber": "1-222-3551",
			"physicalState": "Sólido",
			"accessLevel": "3",
			"expirationDate": "2026-01-01T03:00:00.000Z",
			"image": "no",
			"labId": 13
		}
	]
}
```

---

#### get_session_elements

> **Method:** `GET`\
> **Route:** `<api_ip>/elements/session/<sessionId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Elementos encontrados com sucesso",
	"elementsList": [
		{
			"element_id": 1,
			"element_name": "Ácido Clorídrico",
			"element_image": null,
			"element_molar_mass": "36.46",
			"reserved_quantity": "50.00",
			"element_cas_number": "7647-01-0",
			"element_ec_number": "231-595-7",
			"element_admin_level": "2",
			"element_validity": "2026-12-31T03:00:00.000Z",
			"element_physical_state": "Líquido",
			"lab_id": 1
		}
	]
}
```

---

#### get_element_info

> **Method:** `GET`\
> **Route:** `<api_ip>/elements/info/<elementId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Dados obtidos com sucesso.",
	"element": {
		"element_id": 1,
		"element_name": "Ácido Clorídrico",
		"element_image": null,
		"element_molar_mass": "36.46",
		"element_quantity": "500.00",
		"element_cas_number": "7647-01-0",
		"element_ec_number": "231-595-7",
		"element_admin_level": "2",
		"element_validity": "2026-12-31T03:00:00.000Z",
		"element_physical_state": "Líquido",
		"lab_id": 1
	}
}
```

---

#### edit_element_name

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/name`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_name": "Elemento x"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Nome editado com sucesso."
}
```

---

#### edit_element_quantity

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/quantity`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_quantity": 100
}
```

Saída:

```json
{
	"status": true,
	"msg": "Quantidade editada com sucesso."
}
```

---

#### edit_element_CAS

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/cas`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_cas_number": "1111-111"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Número CAS editado com sucesso."
}
```

---

#### edit_element_EC

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/ec`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_ec_number": "222-222-22"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Número EC editado com sucesso."
}
```

---

#### edit_element_physical_state

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/state`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_physical_state": "Sólido"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Estado físico editado com sucesso."
}
```

---

#### edit_element_validity

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/validity`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_validity": "2022-10-20"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Validade editada com sucesso."
}
```

---

#### edit_element_administration

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/admin`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_admin_level": 3
}
```

Saída:

```json
{
	"status": true,
	"msg": "Responsável editado com sucesso."
}
```

---

#### edit_element_molar_mass

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/molarmass`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_molar_mass": 69
}
```

Saída:

```json
{
	"status": true,
	"msg": "Massa molar editada com sucesso."
}
```

---

#### edit_element_image

> **Method:** `PUT`\
> **Route:** `<api_ip>/elements/edit/image`\
> **Token:** requer

Entrada:

```json
{
	"element_id": 1,
	"element_image": "URI-IMAGE"
}
```

Saída:

```json
{
	"status": true,
	"msg": "Imagem editada com sucesso."
}
```

---

### 🔬 Equipamentos

---

#### register_equipment

> **Method:** `POST`\
> **Route:** `<api_ip>/equipments/register`\
> **Token:** requer

Entrada:

```json
{
	"equipment_name": "Luneta",
	"equipment_quantity": 123,
	"equipment_quality": 5,
	"equipment_admin_level": 2,
	"equipment_image": "img",
	"lab_id": 1
}
```

Saída:

```json
{
	"status": true,
	"msg": "Equipamento registrado com sucesso."
}
```

---

#### delete_equipment

> **Method:** `DELETE`\
> **Route:** `<api_ip>/equipments/delete`\
> **Token:** requer

Entrada:

```json
{
	"equipment_id": 1
}
```

Saída:

```json
{
	"status": true,
	"msg": "Equipamento deletado com sucesso."
}
```

---

#### list_lab_equipments

> **Method:** `GET`\
> **Route:** `<api_ip>/equipments/lab/<labId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Equipamentos encontrados.",
	"equipmentsList": [
		{
			"equipmentId": 2,
			"name": "Centrífuga",
			"description": "Capacidade 12 tubos.",
			"quantity": 3,
			"quality": "4",
			"accessLevel": "2",
			"image": null,
			"labId": 1
		}
	]
}
```

---

#### list_session_equipments

> **Method:** `GET`\
> **Route:** `<api_ip>/equipments/session/<labId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Equipamentos encontrados.",
	"equipmentsList": [
		{
			"equipment_id": 2,
			"equipment_name": "Centrífuga",
			"equipment_description": "Capacidade 12 tubos.",
			"equipment_image": null,
			"total_quantity": 3,
			"reserved_quantity": 1,
			"equipment_quality": "4",
			"equipment_admin_level": "2",
			"lab_id": 1
		}
	]
}
```

---

#### get_equipment_info

> **Method:** `GET`\
> **Route:** `<api_ip>/equipments/info/<equipmentId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Dados obtidos com sucesso.",
	"equipment": {
		"equipment_id": 2,
		"equipment_name": "Centrífuga",
		"equipment_description": "Capacidade 12 tubos.",
		"equipment_quantity": 3,
		"equipment_quality": "4",
		"equipment_admin_level": "2",
		"equipment_image": null,
		"lab_id": 1
	}
}
```

---

#### edit_equipment_name

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/name`\
> **Token:** requer

Entrada:

```json
{
	"equipment_name": "NACL - Sal de cozinha",
	"equipment_id": 2
}
```

Saída:

```json
{
	"status": true,
	"msg": "Nome do equipamento editado com sucesso."
}
```

---

#### edit_equipment_quantity

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/quantity`\
> **Token:** requer

Entrada:

```json
{
	"equipment_quantity": 69,
	"equipment_id": 2
}
```

Saída:

```json
{
	"status": true,
	"msg": "Quantidade do equipamento editado com sucesso."
}
```

---

#### edit_equipment_quality

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/quality`\
> **Token:** requer

Entrada:

```json
{
	"equipment_quality": 1,
	"equipment_id": 2
}
```

Saída:

```json
{
	"status": true,
	"msg": "Qualidade do equipamento editado com sucesso."
}
```

---

#### edit_equipment_description

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/description`\
> **Token:** requer

Entrada:

```json
{
	"equipment_description": "é uma descrição muito completa",
	"equipment_id": 2
}
```

Saída:

```json
{
	"status": true,
	"msg": "Descrição do equipamento editado com sucesso."
}
```

---

#### edit_equipment_administration

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/admin`\
> **Token:** requer

Entrada:

```json
{
	"equipment_admin_level": 3,
	"equipment_id": 2
}
```

Saída:

```json
{
	"status": true,
	"msg": "Nível de administração do equipamento editado com sucesso."
}
```

---

#### edit_equipment_image

> **Method:** `PUT`\
> **Route:** `<api_ip>/equipments/edit/image`\
> **Token:** requer

Entrada:

```json
{
	"equipment_image": "URI-IMAGE",
	"equipment_id": 2
}
```

Saída:

```json
{
	"status": true,
	"msg": "Imagem do equipamento editado com sucesso."
}
```

---

### 📆 Sessões

---

#### create_new_session

> **Method:** `POST`\
> **Route:** `<api_ip>/sessions/create`\
> **Token:** requer

Entrada:

```json
{
	"lab_id": 1,
	"session_date": "2025-11-09",
	"session_starts_at": "16:00",
	"session_ends_at": "17:00",
	"elements_list": [
		{
			"element_id": 5
		}
	],
	"equipments_list": [
		{
			"equipment_id": 2
		}
	]
}
```

Saída:

```json
{
	"status": true,
	"msg": "Sessão criada com sucesso."
}
```

---

#### delete_session

> **Method:** `DELETE`\
> **Route:** `<api_ip>/sessions/delete`\
> **Token:** requer

Entrada:

```json
{
	"session_id": 13
}
```

Saída:

```json
{
	"status": true,
	"msg": "Sessão deletada com sucesso."
}
```

---

#### start_session

> **Method:** `PUT`\
> **Route:** `<api_ip>/sessions/start`\
> **Token:** requer

Entrada:

```json
{
	"session_id": 13
}
```

Saída:

```json
{
	"status": true,
	"msg": "Sessão iniciada com sucesso."
}
```

---

#### finish_session

> **Method:** `PUT`\
> **Route:** `<api_ip>/sessions/finish`\
> **Token:** requer

Entrada:

```json
{
	"session_id": 13
}
```

Saída:

```json
{
	"status": true,
	"msg": "Sessão finalizada com sucesso."
}
```

---

#### list_user_sessions

> **Method:** `GET`\
> **Route:** `<api_ip>/sessions/mysessions`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Sessões encontradas.",
	"sessionsList": [
		{
			"sessionId": 3,
			"labName": "Lab Química A101",
			"date": "2025-09-03T03:00:00.000Z",
			"startsAt": "10:00:00",
			"endsAt": "12:00:00",
			"sessionStatus": "Finalizada",
			"elementsQtd": "30.00",
			"equipmentsQtd": "0",
			"formDone": 0
		}
	]
}
```

---

#### get_utilization_form

> **Method:** `GET`\
> **Route:** `<api_ip>/sessions/form/<sessionId>`\
> **Token:** requer

Entrada:

```json
{}
```

Saída:

```json
{
	"status": true,
	"msg": "Formulário encontrado.",
	"elements": [
		{
			"element_id": 5,
			"element_name": "Cloreto de Sódio",
			"element_image": null,
			"element_molar_mass": "58.44",
			"reserved_quantity": "0.00",
			"element_cas_number": "7647-14-5",
			"element_ec_number": "231-598-3",
			"element_admin_level": "1",
			"element_validity": "2028-01-01T03:00:00.000Z",
			"element_physical_state": "Sólido",
			"lab_id": 1
		}
	]
}
```

---

#### save_utilization_form

> **Method:** `PUT`\
> **Route:** `<api_ip>/sessions/form/set`\
> **Token:** requer

Entrada:

```json
{
	"session_id": 13,
	"elements_list": [
		{
			"element_id": 5,
			"element_quantity": 2
		},
		{
			"element_id": 2,
			"element_quantity": 5
		},
		{
			"element_id": 3,
			"element_quantity": 5
		}
	]
}
```

Saída:

```json
{
	"status": true,
	"msg": "Formulário salvo com sucesso."
}
```

---
