# Visão Geral

O modelo representa um sistema de monitoramento de sensores vinculado as empresas parceiras, com coleta de dados, controle de usuários e endereços.
A modelagem está organizada em seis entidades principais:

- **EMPRESA:** é o centro do sistema, guarda o nome e o período de contrato.
- **SENSOR:** representa o dispositivo físico que coleta informações.
- **LIXEIRA:** Representa o container de lixo físico, que está localizado em um endereço.
- **COLETA DADOS:** registra as medições captadas pelos sensores (data, hora, valor).
- **ENDEREÇO:** indica onde os sensores estão instalados.
- **USUÁRIO:** controla quem acessa o sistema e a qual empresa pertence.

## TIPOS DE ENTIDADES
O modelo contém dois tipos principais de entidades:

a) **ENTIDADES PRINCIPAIS** (ou fortes)
   São aquelas que possuem existência independente e representam objetos centrais do sistema.
   
   - **EMPRESA:** representa o cliente principal do sistema.
   - **SENSOR:** dispositivo físico que coleta dados.
   - **USUÁRIO:** pessoa que acessa o sistema e realiza ações.
   - **ENDEREÇO:** localização física de sensores.

b) ENTIDADES DEPENDENTES (ou fracas)
   Dependem de outras para existir e só fazem sentido quando associadas a uma entidade principal.
   
   - **LIXEIRA:** Depende de um ENDERECO, pois só existe se estiver alocada em uma localização.
   - **COLETA DADOS:** depende de SENSOR, pois só existe se o sensor tiver feito uma coleta.

## RELACIONAMENTOS

- Uma **EMPRESA** pode ter vários **USUÁRIOS e SENSORES**.
- Um **ENDERECO** pode ser o local de instalação de várias LIXEIRAS.
- Cada **USUÁRIO** pertence a uma **EMPRESA** e pode ter um superior (administrador).
- Cada **LIXEIRA** está ligada a um único ENDERECO e pode conter um ou mais SENSORES.
- Cada **SENSOR** gera várias **COLETAS DE DADOS**.
