# Explicação da Modelagem

## Visão Geral

A modelagem representa um sistema de monitoramento de sensores
vinculados a empresas parceiras, incluindo controle de usuários,
registros de coleta e endereços associados aos sensores.

O modelo está organizado em cinco entidades principais:

-   **EMPRESA:** armazena informações da empresa cliente, como nome e
    período de contrato.
-   **SENSOR:** representa o dispositivo físico que monitora e reporta
    dados.
-   **COLETA:** registra os eventos de coleta feitos pelos sensores
    (data, hora, distância).
-   **ENDEREÇO:** determina o local onde cada sensor está instalado.
-   **USUÁRIO:** representa os usuários do sistema, vinculados a uma
    empresa.

------------------------------------------------------------------------

## Tipos de Entidades

### a) Entidades Principais (Fortes)

Possuem existência independente dentro do sistema:

-   **EMPRESA:** cliente principal.
-   **SENSOR:** dispositivo monitorado.
-   **USUÁRIO:** pessoas com acesso ao sistema.
-   **ENDEREÇO:** localização física dos sensores.

### b) Entidades Dependentes (Fracas)

Dependem de outras entidades para existir:

-   **COLETA:** depende de **SENSOR**, pois cada coleta só existe se
    houver um sensor associado.

------------------------------------------------------------------------

## Relacionamentos

-   Uma **EMPRESA** pode ter vários **USUÁRIOS** e vários **SENSORES**
    associados.
-   Cada **SENSOR** pertence a uma **EMPRESA** e está vinculado a um
    **ENDEREÇO**.
-   Cada **SENSOR** pode gerar diversas **COLETAS** ao longo do tempo.
-   Cada **USUÁRIO** pertence a uma **EMPRESA** e possui níveis de
    acesso definidos.
