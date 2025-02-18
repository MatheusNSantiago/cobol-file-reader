000000******************************************************************
000000* CONTEUDO DOS CAMPOS NO HEADER (AGENCIA 0)
000000*
000000* 307-DT-ABERTURA   020 010 A DATA-ATUAL AAAA-MM-DD
000000* 307-DT-ULT-ATIVO  030 010 A DATA-ANTER AAAA-MM-DD
000000* 307-DT-INI-INAD   040 010 A DATA-ANT-2 AAAA-MM-DD
000000* 307-VENCIMENTO    050 010 A DATA-FUT   AAAA-MM-DD
000000* 307-COD-BDC       138 004 B DATA-ATU   DDMMAAA
000000* 307-BDC-SOLID     142 004 B DATA-ANT   DDMMAAA
000000* 307-TELEFONE      146 004 B DATA-FUT   DDMMAAA
000000******************************************************************
000000*
000000* BOOK DEBK307 DA TABELA DB2DEB.TDEB307
000000*
000000******************************************************************
000000* VRS118 28.06.2021 JUNILHO  INUTILIZA O CAMPO RESG-AUTOM.
000000* VRS117 28.10.2019 JUNILHO  CRIA RESTR-CNPJ-INAPTO.
000000* VRS116 18.02.2019 JUNILHO  INCLUI GD-MONITORADA EM INDICADORES.
000000* VRS115 31.01.2018 JUNILHO  INCLUI GD-INDICADORES.
000000* VRS114 06.12.2016 TODDY    ALTERA COMENTARIOS PRIVACIDADE
000000* VRS113 02.06.2016 TODDY    ALTERA COMENTARIOS
000000* VRS112 27.05.2014 JUNILHO  INCLUI INDICADORES CONTA MIGRADA.
000000* VRS111 21.10.2013 M. PENA  ATUALIZA COMENTARIOS DA PESSOA
000000* VRS110 15.10.2013 M. PENA  ATUALIZA COMENTARIOS DO NR PF
000000* VRS109 16.08.2013 JUNILHO  INCLUI DATA FUTURA CPO VENC-CH-ESP
000000* VRS108 12.08.2010 M. PENA  ATUALIZA COMENTARIOS DO STATUS
000000* VRS107 10.03.2010 CLAUDIA  ATUALIZA COMENTARIOS P/PRIVACIDADE
000000*                            989 E MOMENTO TRANSFERENCIA.
000000* VRS106 08.02.2010 PAULA    INCLUI COMENTARIOS PARA NR E SMI.
000000* VRS105 09.06.2008 ROBERTO  INCLUI COMENTARIOS PARA PRIVAT,
000000*                            INSENTO-IOF E INDICADORES.
000000* VRS104 23.10.2007 TATIANA  ALTERAR NR E SMI
000000*                            UNIFICAÇãO DO NR E DO CóDIGO SMI:
000000*                            --------------------------------
000000*                   De  : 4 - PREFERENCIAL  de (COD NO SMI 2302) +
000000*                         5 - PESSOA FISICA de (COD NO SMI 2402)
000000*                   Para: 4 - NR D          de (COD NO SMI 2302)
000000*
000000* VRS103 06.02.2006 ROBERTO     ADICIONA COMENTARIOS PRO IND-MALA.
000000* VRS102 09.02.2005 OSNI        INCLUI COMENTARIOS CONTA ESTILO.
000000* VRS101 12.07.2004 JUVENAL     ALTERA CODIGO DO NR NO IND-MALA
000000* VRS100 25.02.2004 ROBERTO     ALTERA DESCRICAO DOS CAMPOS
000000******************************************************************
000000* TABLESPACE     : S1DEB307
000000* INDICES        : IDEB307A - UNICO - CLUSTER - PARTICIONADO(8)
000000*                   - DEB307_AGENCIA
000000*                   - DEB307_CONTA
000000*                  IDEB307B
000000*                   - DEB307_AGENCIA
000000*                   - DEB307_RAZAO
000000*                  IDEB307C
000000*                   - DEB307_SUPER
000000*                   - DEB307_RAZAO
000000*                   - DEB307_CONTA
000000*                  IDEB307D
000000*                   - DEB307_CONTA
000000******************************************************************
000000*    EXEC SQL DECLARE DB2DEB.TDEB307 TABLE
000000*    ( DEB307_AGENCIA                 DECIMAL(5, 0),
000000*      DEB307_CONTA                   DECIMAL(11, 0),
000000*      DEB307_SETEX                   DECIMAL(3, 0),
000000*      DEB307_RAZAO                   INTEGER,
000000*      DEB307_CESEC                   SMALLINT,
000000*      DEB307_SUPER                   SMALLINT,
000000*      DEB307_DT_ABERTURA             DATE,
000000*      DEB307_DT_ULT_ATIV             DATE,
000000*      DEB307_DT_INI_INAD             DATE,
000000*      DEB307_VENC_CH_ESP             DATE,
000000*      DEB307_DT_ULT_DBTO             DATE,
000000*      DEB307_DT_CONTRATO             DATE,
000000*      DEB307_NOM_TITULAR             CHAR(25),
000000*      DEB307_NOM_SOLIDAR             CHAR(25),
000000*      DEB307_CGC_CPF                 DECIMAL(15, 0),
000000*      DEB307_COD_BDC                 INTEGER,
000000*      DEB307_BDC_SOLID               INTEGER,
000000*      DEB307_TELEFONE                INTEGER,
000000*      DEB307_DDD                     DECIMAL(3, 0),
000000*      DEB307_RAMAL                   DECIMAL(5, 0),
000000*      DEB307_SALDO_ATUAL             DECIMAL(17, 2),
000000*      DEB307_SALDO_D_1               DECIMAL(17, 2),
000000*      DEB307_SALDO_D_2               DECIMAL(17, 2),
000000*      DEB307_JUROS                   DECIMAL(17, 2),
000000*      DEB307_IOF                     DECIMAL(17, 2),
000000*      DEB307_CPMF                    DECIMAL(17, 2),
000000*      DEB307_DEP_INDET               DECIMAL(17, 2),
000000*      DEB307_VALOR_1                 DECIMAL(17, 2),
000000*      DEB307_PROVENTOS_1             DECIMAL(17, 2),
000000*      DEB307_PROVENTOS_2             DECIMAL(17, 2),
000000*      DEB307_PROVENTOS_3             DECIMAL(17, 2),
000000*      DEB307_EXTRA_LIMIT             DECIMAL(13, 2),
000000*      DEB307_LIM_FUTURO              DECIMAL(13, 0),
000000*      DEB307_LIMITE                  DECIMAL(13, 0),
000000*      DEB307_LIM_MES_ANT             DECIMAL(13, 0),
000000*      DEB307_ULT_CHQ_OL              INTEGER,
000000*      DEB307_CHEQUES                 INTEGER,
000000*      DEB307_ULTIMO_CHEQ             INTEGER,
000000*      DEB307_QTD_DEZ_CHQ             DECIMAL(3, 0),
000000*      DEB307_CONTRA_ORDE             SMALLINT,
000000*      DEB307_ISEN_CPMF               SMALLINT,
000000*      DEB307_RESG_AUTOM              DECIMAL(17, 0),
000000*      DEB307_APLIC_AUTOM             DECIMAL(3, 0),
000000*      DEB307_COD_DEB558              INTEGER,
000000*      DEB307_AG_DESTINO              SMALLINT,
000000*      DEB307_CNTA_DEST               INTEGER,
000000*      DEB307_PRIVAT                  SMALLINT,
000000*      DEB307_INDICADORES             DECIMAL(13, 0),
000000*      DEB307_OBSERVACAO              CHAR(1),
000000*      DEB307_SITUACAO                DECIMAL(1, 0),
000000*      DEB307_ISENTO_IOF              DECIMAL(1, 0),
000000*      DEB307_MT_CO_C_ESP             DECIMAL(1, 0),
000000*      DEB307_EMPRESTIMO              DECIMAL(1, 0),
000000*      DEB307_EMPR_MES_AN             DECIMAL(1, 0),
000000*      DEB307_UTIL_LIMITE             DECIMAL(1, 0),
000000*      DEB307_TP_EXTRATO              DECIMAL(1, 0),
000000*      DEB307_PER_EXTRATO             DECIMAL(1, 0),
000000*      DEB307_REM_EXTRATO             DECIMAL(1, 0),
000000*      DEB307_DEP_IDENTIF             DECIMAL(1, 0),
000000*      DEB307_NIV_TX_C_ES             DECIMAL(1, 0),
000000*      DEB307_PESSOA                  DECIMAL(1, 0),
000000*      DEB307_CARTAO                  DECIMAL(1, 0),
000000*      DEB307_STATUS                  DECIMAL(1, 0),
000000*      DEB307_TL_ROUBADO              DECIMAL(1, 0),
000000*      DEB307_CRED_LIQUI              DECIMAL(1, 0),
000000*      DEB307_MOMENTO_RES             DECIMAL(1, 0),
000000*      DEB307_TP_TL_EXEC              DECIMAL(1, 0),
000000*      DEB307_COND_CHEQUE             DECIMAL(1, 0),
000000*      DEB307_PER_DEB558              DECIMAL(1, 0),
000000*      DEB307_TALAO_MES               DECIMAL(1, 0),
000000*      DEB307_TRANSFER                DECIMAL(1, 0),
000000*      DEB307_MOM_TRANSF              DECIMAL(1, 0),
000000*      DEB307_TP_CH_ESP               DECIMAL(1, 0),
000000*      DEB307_EMITE_AVISO             DECIMAL(1, 0),
000000*      DEB307_DEV_MANUAL              DECIMAL(1, 0),
000000*      DEB307_RG_IRREG                DECIMAL(1, 0),
000000*      DEB307_FONE_TALAO              DECIMAL(1, 0),
000000*      DEB307_RED_BLOQ                DECIMAL(1, 0),
000000*      DEB307_IND_MALA                DECIMAL(1, 0),
000000*      DEB307_BLOQ_CARTAO             DECIMAL(1, 0)
000000*    ) END-EXEC.
000000******************************************************************
000000
000000 01  DCLTDEB307               PIC  X(361).
000000*
000000 01  FILLER REDEFINES DCLTDEB307.
000000     03  DEB307-AGENCIA       PIC S9(05)V COMP-3.
000000     03  DEB307-CONTA         PIC S9(11)V COMP-3.
000000     03  DEB307-SETEX         PIC S9(03)V COMP-3.
000000     03  DEB307-RAZAO         PIC S9(09)  COMP.
000000     03  DEB307-CESEC         PIC S9(04)  COMP.
000000     03  DEB307-SUPER         PIC S9(04)  COMP.
000000     03  DEB307-DT-ABERTURA   PIC  X(10).
000000     03  DEB307-DT-ULT-ATIV   PIC  X(10).
000000     03  DEB307-DT-INI-INAD   PIC  X(10).
000000     03  DEB307-VENC-CH-ESP   PIC  X(10).
000000     03  DEB307-DT-ULT-DBTO   PIC  X(10).
000000     03  DEB307-DT-CONTRATO   PIC  X(10).
000000     03  DEB307-NOM-TITULAR   PIC  X(25).
000000     03  DEB307-NOM-SOLIDAR   PIC  X(25).
000000     03  DEB307-CGC-CPF       PIC S9(15)V COMP-3.
000000     03  DEB307-COD-BDC       PIC S9(09)  COMP.
000000     03  DEB307-BDC-SOLID     PIC S9(09)  COMP.
000000     03  DEB307-TELEFONE      PIC S9(09)  COMP.
000000     03  DEB307-DDD           PIC S9(03)V COMP-3.
000000     03  DEB307-RAMAL         PIC S9(05)V COMP-3.
000000     03  DEB307-SALDO-ATUAL   PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-SALDO-D-1     PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-SALDO-D-2     PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-JUROS         PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-IOF           PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-CPMF          PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-DEP-INDET     PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-VALOR-1       PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-PROVENTOS-1   PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-PROVENTOS-2   PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-PROVENTOS-3   PIC S9(15)V9(2) COMP-3.
000000     03  DEB307-EXTRA-LIMIT   PIC S9(11)V9(2) COMP-3.
000000     03  DEB307-LIM-FUTURO    PIC S9(13)V COMP-3.
000000     03  DEB307-LIMITE        PIC S9(13)V COMP-3.
000000     03  DEB307-LIM-MES-ANT   PIC S9(13)V COMP-3.
000000     03  DEB307-ULT-CHQ-OL    PIC S9(09)  COMP.
000000     03  DEB307-CHEQUES       PIC S9(09)  COMP.
000000     03  DEB307-ULTIMO-CHEQ   PIC S9(09)  COMP.
000000     03  DEB307-QTD-DEZ-CHQ   PIC S9(03)V COMP-3.
000000     03  DEB307-CONTRA-ORDE   PIC S9(04)  COMP.
000000     03  DEB307-ISEN-CPMF     PIC S9(04)  COMP.
000000     03  DEB307-RESG-AUTOM    PIC S9(17)V COMP-3.
000000     03  DEB307-APLIC-AUTOM   PIC S9(03)V COMP-3.
000000     03  DEB307-COD-DEB558    PIC S9(09)  COMP.
000000     03  DEB307-AG-DESTINO    PIC S9(04)  COMP.
000000     03  DEB307-CNTA-DEST     PIC S9(09)  COMP.
000000     03  DEB307-PRIVAT        PIC S9(04)  COMP.
000000     03  DEB307-INDICADORES   PIC S9(13)V COMP-3.
000000     03  DEB307-OBSERVACAO    PIC  X(01).
000000     03  DEB307-SITUACAO      PIC S9(01)V COMP-3.
000000     03  DEB307-ISENTO-IOF    PIC S9(01)V COMP-3.
000000     03  DEB307-MT-CO-C-ESP   PIC S9(01)V COMP-3.
000000     03  DEB307-EMPRESTIMO    PIC S9(01)V COMP-3.
000000     03  DEB307-EMPR-MES-AN   PIC S9(01)V COMP-3.
000000     03  DEB307-UTIL-LIMITE   PIC S9(01)V COMP-3.
000000     03  DEB307-TP-EXTRATO    PIC S9(01)V COMP-3.
000000     03  DEB307-PER-EXTRATO   PIC S9(01)V COMP-3.
000000     03  DEB307-REM-EXTRATO   PIC S9(01)V COMP-3.
000000     03  DEB307-DEP-IDENTIF   PIC S9(01)V COMP-3.
000000     03  DEB307-NIV-TX-C-ES   PIC S9(01)V COMP-3.
000000     03  DEB307-PESSOA        PIC S9(01)V COMP-3.
000000     03  DEB307-CARTAO        PIC S9(01)V COMP-3.
000000     03  DEB307-STATUS        PIC S9(01)V COMP-3.
000000     03  DEB307-TL-ROUBADO    PIC S9(01)V COMP-3.
000000     03  DEB307-CRED-LIQUI    PIC S9(01)V COMP-3.
000000     03  DEB307-MOMENTO-RES   PIC S9(01)V COMP-3.
000000     03  DEB307-TP-TL-EXEC    PIC S9(01)V COMP-3.
000000     03  DEB307-COND-CHEQUE   PIC S9(01)V COMP-3.
000000     03  DEB307-PER-DEB558    PIC S9(01)V COMP-3.
000000     03  DEB307-TALAO-MES     PIC S9(01)V COMP-3.
000000     03  DEB307-TRANSFER      PIC S9(01)V COMP-3.
000000     03  DEB307-MOM-TRANSF    PIC S9(01)V COMP-3.
000000     03  DEB307-TP-CH-ESP     PIC S9(01)V COMP-3.
000000     03  DEB307-EMITE-AVISO   PIC S9(01)V COMP-3.
000000     03  DEB307-DEV-MANUAL    PIC S9(01)V COMP-3.
000000     03  DEB307-RG-IRREG      PIC S9(01)V COMP-3.
000000     03  DEB307-FONE-TALAO    PIC S9(01)V COMP-3.
000000     03  DEB307-RED-BLOQ      PIC S9(01)V COMP-3.
000000     03  DEB307-IND-MALA      PIC S9(01)V COMP-3.
000000     03  DEB307-BLOQ-CARTAO   PIC S9(01)V COMP-3.
000000*
000000******************************************************************
000000* DESCRICAO DOS CAMPOS:                                          *
000000* ''''''''''''''''''''''                                         *
000000* DEB307-AGENCIA       PREFIXO DA AGENCIA                        *
000000*                                                                *
000000* DEB307-CONTA         NUMERO DA CONTA                           *
000000*                                                                *
000000* DEB307-SETEX         GRUPO SETEX                               *
000000*                                                                *
000000* DEB307-RAZAO         UNIVERSITARIO (EX BB-CAMPUS)    310019808 *
000000*                                                                *
000000*                      JOVEM                310019809            *
000000*                                                                *
000000*                      PUBLICO-OURO         310019801  311051201 *
000000*                                           311601001  311602001 *
000000*                      PUBLICO-EXECUTIVO    310019811  311051211 *
000000*                      PUBLICO-CLASSIC      310019821  311051221 *
000000*                                                                *
000000*                      FUNCIONARIO-OURO     310019803  311051203 *
000000*                      FUNCI-EXECUTIVO      310019813  311051213 *
000000*                      FUNCI-CLASSIC        310019823  311051223 *
000000*                                                                *
000000*                      APOSENTADO-BB-OURO   310019804  310019814 *
000000*                      APOS-BB-CLASSIC      311051214  311051224 *
000000*                      APOS-BB-EXECUTIVO    310019824  311051204 *
000000*                                                                *
000000*                      MAXBLUE              310019802  311051202 *
000000*                                                                *
000000*                      PRIVATE              310019806            *
000000*                                                                *
000000
000000*                                                                *
000000*                      PESSOA JURIDICA      310059807  310059814 *
000000*                                           310059828  311052101 *
000000*                                           311052128            *
000000*                                                                *
000000*                      CH-OURO-EMPRESARIAL  310059807  310059814 *
000000*                                           310059828  311052101 *
000000*                                           311052128            *
000000*                                                                *
000000*                      CH-OURO-FISICA       310019801  311051201 *
000000*                                           310019803  311051203 *
000000*                                           310019804  311051204 *
000000*                                                                *
000000*                      CH-OURO-EXECUTIVO    310019811  311051211 *
000000*                                           310019813  311051213 *
000000*                                           310019814  311051214 *
000000*                                                                *
000000*                      UNIVERSITARIO (EX BB-CAMPUS)    310019808 *
000000*                                                                *
000000*                      CLASSIC              310019821  311051221 *
000000*                                           310019823  311051223 *
000000*                                           310019824  311051224 *
000000*                                                                *
000000*                      BEMAT                310010900  310050900 *
000000*                                                                *
000000*                      BB GIRO RAPIDO       310050775  310050779 *
000000*                                           310050787            *
000000*                                                                *
000000*                      ESPECIAL ELETRONICA  310018528            *
000000*                                                                *
000000* DEB307-CESEC         CESEC                                     *
000000*                                                                *
000000* DEB307-SUPER         PREFIXO DA SUPER ESTADUAL DA AGENCIA      *
000000*                                                                *
000000* DEB307-DT-ABERTURA   DATA DA ABERTURA DA CONTA                 *
000000*                      NO HEADER CONTEM A DATA-ATUAL (AMD)       *
000000*                                                                *
000000* DEB307-DT-ULT-ATIV   DATA DA ULTIMA MOVIMENTACAO               *
000000*                      NO HEADER CONTEM A DATA-ANTERIOR (AMD)    *
000000*                                                                *
000000* DEB307-DT-INI-INAD   DATA DO INICIO DA INADIMPLENCIA           *
000000*                      NO HEADER CONTEM A DATA-ANT-2    (AMD)    *
000000*                                                                *
000000* DEB307-VENC-CH-ESP   DATA DO VENCIMENTO DO CHEQUE ESPECIAL     *
000000*                      NO HEADER CONTEM A DATA-FUTURA   (AMD)    *
000000*                                                                *
000000* DEB307-DT-ULT-DBTO   DATA DO ULTIMO DEBITO                     *
000000*                                                                *
000000* DEB307-DT-CONTRATO   DATA DA CONTRATACAO DO CHEQUE ESPECIAL    *
000000*                      (NAO INCLUI DATA DE RENOVACAO)            *
000000*                                                                *
000000* DEB307-NOM-TITULAR   NOME PERSONALIZADO DO TITULAR             *
000000*                                                                *
000000* DEB307-NOM-SOLIDAR   NOME PERSONALIZADO DO SEGUNDO TITULAR     *
000000*                                                                *
000000* DEB307-CGC-CPF       CPF OU CNPJ DO CLIENTE                    *
000000*                                                                *
000000* DEB307-COD-BDC       CODIGO MCI                                *
000000*                      NO HEADER CONTEM A DATA-ATUAL (DDMMAAAA)  *
000000*                                                                *
000000* DEB307-BDC-SOLID     CODIGO MCI DO SEGUNDO TITULAR             *
000000*                      NO HEADER CONTEM A DATA-ANT   (DDMMAAAA)  *
000000*                                                                *
000000* DEB307-TELEFONE      TELEFONE                                  *
000000*                      NO HEADER CONTEM A DATA-FUTURA(DDMMAAAA)  *
000000*                                                                *
000000* DEB307-DDD           CODIGO DA INSTITUICAO                     *
000000*                                                                *
000000* DEB307-RAMAL         DIA DO DEBITO ATUAL  9(02)                *
000000*                      DIA DO DEBITO FUTURO 9(02)                *
000000*                                                                *
000000* DEB307-SALDO-ATUAL   SALDO ATUAL                               *
000000*                                                                *
000000* DEB307-SALDO-D-1     SALDO EM D-1                              *
000000*                                                                *
000000* DEB307-SALDO-D-2     SALDO EM D-2                              *
000000*                                                                *
000000* DEB307-JUROS         JUROS                                     *
000000*                                                                *
000000* DEB307-IOF           IOF                                       *
000000*                                                                *
000000* DEB307-CPMF          CPMF                                      *
000000*                                                                *
000000* DEB307-DEP-INDET     DEPOSITO BLOQUEADO P/PRAZO INDETERMINADO  *
000000*                                                                *
000000* DEB307-VALOR-1       0                                         *
000000*                                                                *
000000* DEB307-PROVENTOS-1   PROVENTOS DO MES ANTERIOR                 *
000000*                                                                *
000000* DEB307-PROVENTOS-2   PROVENTOS DO MES ANTERIOR - 1             *
000000*                                                                *
000000* DEB307-PROVENTOS-3   PROVENTOS DO MES ANTERIOR - 2             *
000000*                                                                *
000000* DEB307-LIM-FUTURO    LIMITE FUTURO DO CHEQUE ESPECIAL          *
000000*                      777777 - CH.ESP BLOQUEADO PELO COR        *
000000*                                                                *
000000* DEB307-LIMITE        LIMITE DO CHEQUE ESPECIAL                 *
000000*                                                                *
000000* DEB307-ULT-CHQ-OL    ULTIMO CHEQUE RETIRADO NO TERMINAL        *
000000*                                                                *
000000* DEB307-CHEQUES       TOTAL DE CHEQUES CADASTRADOS              *
000000*                                                                *
000000* DEB307-ULTIMO-CHEQ   ULTIMO CHEQUE EMITIDO PELO SISTEMA        *
000000*                                                                *
000000* DEB307-QTD-DEZ-CHQ   QUANTIDADE DE DEZENAS REPOSTAS PARA CADA  *
000000*                      SOLICITACAO DE REPOSICAO DE TALONARIO     *
000000*                                                                *
000000* DEB307-CONTRA-ORDE   TOTAL DE CHEQUES CONTRA ORDENADOS         *
000000*                                                                *
000000* DEB307-ISEN-CPMF     ISENCAO DO CPMF                           *
000000*                      0 - NAO ISENTO                            *
000000*                      7 - ISENTO POR LIMINAR - C/ RECOLHIMENTO  *
000000*                      8 - ISENTO POR LIMINAR - C/ RECOLHIMENTO  *
000000*                          EM OUTRO BANCO                        *
000000*                      9 - CONTA ISENTA DE CPMF                  *
000000*                                                                *
000000* DEB307-RESG-AUTOM    ESTE CAMPO NAO EH MAIS UTILIZADO          *
000000*                      A REGUA DE RESGATE ESTAH NA TABELA        *
000000*                      S9DEB610 - DEBK1610 - DB2DEB.CT_RSGT_AUTC *
000000*                                                                *
000000* DEB307-APLIC-AUTOM   CODIGO DA APLICACAO AUTOMATICA            *
000000*                     11 - APLICA SALARIO NO FIX-CURTO PRAZO     *
000000*                     91 - APLICA SALARIO NA POUPANCA            *
000000*                    111 - APLICA SALDO   NO FIX-CURTO PRAZO     *
000000*                    191 - APLICA SALDO   NA POUPANCA            *
000000*                    391 - APLICA SALARIO NA POUPANCA E SALDO    *
000000*                          NO FIX-CURTO PRAZO                    *
000000*                                                                *
000000* DEB307-COD-DEB558    CODIGO DE CONVENIO PARA EMISSAO DO EXTRATO*
000000*                      DEB558                                    *
000000*                                                                *
000000* DEB307-AG-DESTINO    AGENCIA DE DESTINO                        *
000000*                                                                *
000000* DEB307-CNTA-DEST     CONTA DE DESTINO                          *
000000*                                                                *
000000* DEB307-PRIVAT        PRIVATICIDADE                             *
000000*                      000 - SEM RESTRICAO                       *
000000*                      004 - DEB                                 *
000000*                      010 - EVT                                 *
000000*                      085 - DME                                 *
000000*                      504 - NAO ACEITA DEBITOS                  *
061216*               981 AA 987 - VAGO                                *
061216*                      988 - CONTAS COM INDICIO DE ABERTURA      *
061216*                            FRAUDULENTA - USO DO ROI            *
061216*                          A) ACEITA LANCAMENTOS DO SISTEMA ROI  *
000000*                      989 - VAGO - ERA INCORPORACAO DE BANCOS   *
000000*                      990 - BLOQUEIO JUDICIAL                   *
061216*                          A) ACEITA CREDITOS DE TODOS SISTEMAS  *
061216*                          B) ACEITA LANCAMENTOS DO SISTEMA DAF  *
061216*                          C) ACEITA LANCAMENTOS DOS SISTEMAS    *
061216*                             DNR E DSR (DEVOLUCAO DE CHEQUES)   *
061216*                          D) ACEITA LANCAMENTOS DO DEB 32, SIS- *
061216*                             TEMA SOL E AGE (TRANSACOES EFETUA- *
061216*                             DAS ANTES DO BLOQUEIO JUDICIAL)    *
061216*                      991 - CONTA SEM CONFORMIDADE DE ABERTURA  *
061216*                          A) NAO ACEITA LANCAMENTOS             *
000000*                      992 - RENEGOCIACAO DE DIVIDAS DO COP      *
061216*                          A) ACEITA CREDITOS DE TODOS SISTEMAS  *
061216*                          B) ACEITA LANCAMENTOS DOS SISTEMAS    *
061216*                             DNR E DSR (DEVOLUCAO DE CHEQUES)   *
061216*                          D) ACEITA LANCAMENTOS DO DEB 32, SIS- *
061216*                             TEMA SOL E AGE (TRANSACOES EFETUA- *
061216*                             DAS ANTES DO BLOQUEIO JUDICIAL)    *
061216*                      993 - EM RENEGOCIACAO DE DIVIDAS DO       *
061216*                            SISTEMA RAO (BOLETO)                *
061216*                          A) ACEITA CREDITOS SISTEMA ACL E RAO  *
061216*                          B) ACEITA LANCAMENTOS DOS SISTEMAS    *
061216*                             DNR E DSR (DEVOLUCAO DE CHEQUES)   *
061216*                      994 - DIVIDA RENEGOCIADA NO SISTEMA RAO   *
061216*                          A) NAO ACEITA LANCAMENTOS             *
000000*                      995 - CPF/CNPJ IRREGULAR                  *
061216*                          A) DEB NAO RECUSA LANCAMENTOS         *
061216*                          B) SOL NAO DEIXA CLIENTE TRANSACIONAR *
061216*                      996 - FASE 1 DA PREPARACAO PARA ENVIO     *
061216*                            PARA PERDAS                         *
061216*                          A) ACEITA CREDITOS                    *
061216*                          B) ACEITA LANCAMENTOS DOS SISTEMAS    *
061216*                             DNR E DSR (DEVOLUCAO DE CHEQUES)   *
061216*                      997 - FASE 2 DA PREPARACAO PARA ENVIO     *
061216*                            PARA PERDAS                         *
061216*                          A) ACEITA LANCAMENTOS APENAS DOS SIS- *
061216*                             TEMAS DEB E XER PARA ZERAR A CONTA *
061216*                      998 - VAGO - ERA DA ROTINA DE PERDAS      *
061216*                      999 - CONTA EM PERDAS                     *
061216*                          A) ACEITA CREDITOS TODOS OS SISTEMAS  *
061216*                          B) ACEITA DEBITOS DO DNR, XER E COP   *
000000*                                                                *
061216* DEB307-INDICADORES   CAMPO DE 13 DIGITOS USADO P/ IDENTIFICAR  *
061216*                      RESTRICOES CADASTRAIS E INDICADORES.      *
      *                                                                *
      *-- MOVER O CAMPO DEB307-INDICADORES PARA DEB307-RESTRICOES      *
      *                                                                *
      *                                                                *
        01  DEB307-RESTRICOES         PIC 9(13).
        01  FILLER REDEFINES DEB307-RESTRICOES.
            03  DEB307-IND-MIGRADA       PIC 9(01).
            03  DEB307-RESTR-MOVIM-ANT   PIC 9(01).
            03  DEB307-IND-MONITORADA    PIC 9(01).
            03  DEB307-RESTR-VAGO        PIC 9(03).
            03  DEB307-RESTR-CNPJ-INAPTO PIC 9(01).
            03  DEB307-RESTR-MOVIM       PIC 9(01).
            03  DEB307-RESTR-AGENCIA     PIC 9(01).
            03  DEB307-RESTR-BLOQ        PIC 9(01).
            03  DEB307-RESTR-FALEC       PIC 9(01).
            03  DEB307-RESTR-COR         PIC 9(01).
            03  DEB307-RESTR-CCF         PIC 9(01).
      *                                                                *
000000*              (1:1) - DEB307-IND-MIGRADA                        *
000000*                      0 - CONTA NORMAL                          *
000000*                      1 - CONTA MIGRADA HOJE (DEBPC301)         *
000000*              (2:1) - DEB307-RESTR-MOVIM-ANT                    *
000000*              (3:1) - DEB307-IND-MONITORADA                     *
      *                      1 - CONTA MONITORADA (LIMITE FOREVER)     *
000000*              (4:3) - VAGO                                      *
000000*              (7:1) - DEB307-RESTR-CNPJ-INAPTO                  *
000000*                      0 - CNPJ OK                               *
000000*                      1 - CNPJ INAPTO                           *
000000*              (8:1) - DEB307-RESTR-MOVIM                        *
000000*                      1 - NAO ACEITA DEBITOS                    *
000000*                      2 - BLOQUEADA                             *
000000*                      3 - NAO ACEITA CREDITOS                   *
000000*              (9:1) - DEB307-RESTR-AGENCIA                      *
000000*                      1 - EXCESSO DE CHEQUES DEVOLVIDOS         *
000000*                      2 - COOPERATIVA DE CREDITO                *
000000*                      3 - SEM CONFORMIDADE NO GA                *
000000*                      8 - SEM MOVIMENTACAO HA MAIS DE 90 DIAS   *
000000*                      9 - OUTROS                                *
000000*             (10:1) - DEB307-RESTR-BLOQ                         *
000000*                      1 - OBSERVACAO B (SALDO BLOQUEADO)        *
000000*                      2 - SDO/DEP. SUPERIOR A R$ 1.000,00       *
000000*                      3 - SALDO SUPERIOR A R$ 3.000,00          *
000000*             (11:1) - DEB307-RESTR-FALEC                        *
000000*                      0 - VIVO                                  *
000000*                      1 - FALECIDO                              *
000000*                      5 - ESPOLIO                               *
000000*             (12:1) - DEB307-RESTR-COR (BLOQUEIO GRB)           *
      *                      0 - SEM BLOQUEIO GRB                      *
      *                      9 - BLOQUEADA PELO GRB                    *
000000*             (13:1) - DEB307-RESTR-CCF                          *
000000*                      0 - NAO ESTAH NO CCF                      *
000000*                      1 - PRIMEIRO TITULAR NO CCF               *
000000*                      2 - SEGUNDO  TITULAR NO CCF               *
000000*                      3 - TERCEIRO TITULAR NO CCF               *
000000*                      4 - QUARTO   TITULAR NO CCF               *
      *                      5 - PRIMEIRO TITULAR PRE INCLUIDO NO CCF  *
      *                      6 - SEGUNDO  TITULAR PRE INCLUIDO NO CCF  *
      *                      7 - TERCEIRO TITULAR PRE INCLUIDO NO CCF  *
      *                      8 - QUARTO   TITULAR PRE INCLUIDO NO CCF  *
000000*                                                                *
000000* DEB307-OBSERVACAO    CAMPO EM DESATIVACAO                      *
000000*                                                                *
000000* DEB307-SITUACAO      SITUACAO DA CONTA                         *
000000*                      3 - ATIVA                                 *
000000*                      5 - ENCERRADA NO MES                      *
000000*                      6 - ENCERRADA NO MES ANTERIOR             *
000000*                      9 - ENCERRADA NO DIA                      *
000000*                                                                *
000000* DEB307-ISENTO-IOF    0 - TRIBUTAVEL (NAO ISENTO)               *
000000*                      1 - ALIQUOTA ZERO (ISENTO)                *
000000*                      2 - MICRO/PEQUENA                         *
000000*                      3 - COOPERATIVAS                          *
000000*                      8 - RAZAO ISENTA                          *
000000*                      9 - RAZAO NAO TRIBUTUTAVEL                *
000000*                                                                *
000000* DEB307-MT-CO-C-ESP   MOTIVO DA CONCESSAO DO CHEQUE ESPECIAL    *
000000*                      0 - NORMAL                                *
000000*                      1 - CONJUGE                               *
000000*                      2 - FILHO                                 *
000000*                      3 - CORTESIA                              *
000000*                      4 - PUBLICO JOVEM                         *
000000*                      5 - AUTORIZANTE                           *
000000*                                                                *
000000* DEB307-EMPRESTIMO    0 - SEM CHEQUE ESPECIAL                   *
000000*                      1 - CHEQUE ESPECIAL                       *
000000*                      2 - CHEQUE ESPECIAL C/ REVERSAO IRREGULAR *
000000*                      3 - FOI CHEQUE ESPECIAL NO ANO            *
000000*                                                                *
000000* DEB307-EMPR-MES-AN   IDEM ITEM ANTERIOR P/ MES ANTERIOR        *
000000*                                                                *
000000* DEB307-UTIL-LIMITE   UTILIZACAO DO LIMITE DO CHEQUE ESPECIAL   *
000000*                      0 - NAO UTILIZOU NO MES                   *
000000*                      1 - UTILIZOU NO MES                       *
000000*                                                                *
000000* DEB307-TP-EXTRATO    TIPO DE EXTRATO                           *
000000*                      1 - ENVELOPE SELADO                       *
000000*                      2 - MODELO 7.804-2                        *
000000*                      3 - MODELO 30.300-3 (DEB724)              *
000000*                                                                *
000000* DEB307-PER-EXTRATO   PERIODICIDADE DO EXTRATO                  *
000000*                      0 - EMISSAO AUTOMATICA                    *
000000*                      1 - EMISSAO DIARIA                        *
000000*                      2 - EMISSAO SEMANAL                       *
000000*                      3 - EMISSAO QUINZENAL                     *
000000*                      4 - EMISSAO MENSAL                        *
000000*                                                                *
000000* DEB307-REM-EXTRATO   REMESSA DO EXTRATO                        *
000000*                      0 - REMETIDO AOS CORREIOS (ORDEM DE DATA) *
000000*                      1 - REMETIDO AAS AGENCIAS (ORDEM DE DATA) *
000000*                      2 - REMETIDO AOS CORREIOS (ORDEM DE DOCS) *
000000*                      3 - REMETIDO AAS AGENCIAS (ORDEM DE DOCS) *
000000*                                                                *
000000* DEB307-DEP-IDENTIF   DEPOSITO IDENTIFICADO                     *
000000*                      0 - SEM IDENTIFICACAO                     *
000000*                      1 - ACEITA DEPOSITO COMUM E IDENTIFICADO  *
000000*                      2 - ACEITA SOMENTE DEPOSITO IDENTIFICADO  *
000000*                      3 - DEPOSITO IDENTIFICADO COM AVISO       *
000000*                      8 - CONTA NAO RECADASTRADA.               *
000000*                      9 - NAO ACEITA DEPOSITO DE ESPECIE ALGUMA.*
000000*                                                                *
000000* DEB307-NIV-TX-C-ES   TAXA DO CHEQUE ESPECIAL                   *
000000*                      1 - TAXA MAXIMA                           *
000000*                      2 - TAXA PARA QUEM RECEBE PROVENTOS NO BB *
000000*                      3 - TAXA PARA PROVENTOS BB + CARTAO       *
000000*                      4 - TAXA APLICADORES + CARTAO + PLANO OURO*
000000*                      5 - TAXA POLITICA DE RELACIONAMENTO       *
000000*                                                                *
000000* DEB307-PESSOA        TIPO DE PESSOA                            *
000000*                      0 - CPF/CNPJ NAO INFORMADO/IRREGULAR      *
000000*                      1 - FISICA                                *
000000*                      2 - JURIDICA                              *
000000*                      3 - CPF/CNPJ NAO INFORMADO/IRREGULAR      *
000000*                                                                *
000000* DEB307-CARTAO        CARTAO DE CREDITO                         *
000000*                      0 - SEM CARTAO                            *
000000*                      1 - OUROCARD-VISA    COM 2 VENCIMENTOS    *
000000*                      2 - OUROCARD-VISA    COM 1 VENCIMENTO     *
000000*                      3 - CLASSCARD-VISA   COM 1 VENCIMENTO     *
000000*                      4 - VAGO                                  *
000000*                      5 - VAGO                                  *
000000*                      6 - OUROCARD-MASTER  COM 2 VENCIMENTOS    *
000000*                      7 - OUROCARD-MASTER  COM 1 VENCIMENTO     *
000000*                      8 - CLASSCARD-MASTER COM 1 VENCIMENTO     *
000000*                      9 - VAGO                                  *
000000*                                                                *
000000* DEB307-STATUS        SE CLIENTE DO BB:                         *
000000*                      1 - CLIENTE NORMAL SEM CARTAO             *
000000*                      2 - CLIENTE NORMAL COM CARTAO             *
000000*                      3 - CLIENTE PREFERENCIAL SEM CARTAO       *
000000*                      4 - CLIENTE PREFERENCIAL COM CARTAO       *
000000*                      5 - CONTA SEM CONFORMIDADE, CONTA ABERTA  *
000000*                          VIA MASSIFICADO DO SISTEMA MCI        *
000000*                                                                *
000000*                      SE BANCO POSTAL (RAZAO 310011501 OU       *
000000*                      310011502), SENDO QUE O 2, 3, 4 E 6       *
000000*                      MOVIMENTAM NORMAL NO SISTEMA SOL:         *
000000*                      1 - CLIENTE NORMAL SEM CARTAO             *
000000*                      2 - CLIENTE NORMAL COM CARTAO (CONTA COM  *
000000*                          CONFORMIDADE)                         *
000000*                      3 - FALTA CONFERIR DOCUMENTOS (MOVIMENTA  *
000000*                          NORMAL NO SOL)                        *
000000*                      4 - DOCUMENTACAO CONFERIDADA, FALTA       *
000000*                          CONFORMIDADE                          *
000000*                      5 - CARTAO BLOQUEADO, CONTA ABERTA VIA    *
000000*                          MASSIFICADO DO SISTEMA MCI, SOH       *
000000*                          DESBLOQUEIA VIA MCI                   *
000000*                      6 - DOCUMENTACAO INCOMPLETA/DEVOLVIDA     *
000000*                                                                *
000000* DEB307-TL-ROUBADO    TALAO ROUBADO                             *
000000*                      0 - NAO TEM                               *
000000*                      1 - TEM                                   *
000000*                                                                *
000000* DEB307-CRED-LIQUI    INDICADOR DE INVESTIMENTO                 *
000000*                      VEM DO CAMPO IND-INVESTIDOR-610           *
000000*                      0 - NAO TEM INVESTIMENTOS                 *
000000*                      1 - TEM INVESTIMENTOS                     *
000000*                                                                *
000000* DEB307-MOMENTO-RES   MOMENTO DO RESGATE AUTOMATICO             *
000000*                      0 - CLIENTE COM SALDO DEVEDOR             *
000000*                      2 - LIMITE ULTRAPASSADO                   *
000000*                                                                *
000000* DEB307-TP-TL-EXEC    TIPO DE TALAO CHEQUE OURO EXECUTIVO       *
000000*                      1 - SEM CANHOTO ABRE POR CIMA             *
000000*                      2 - COM CANHOTO                           *
000000*                      3 - SEM CANHOTO ABRE DO LADO              *
000000*                                                                *
000000* DEB307-COND-CHEQUE   CONDICAO DE CHEQUE                        *
000000*                                                                *
000000*    0 - COM USO DE CHEQUES                                      *
000000*    1 - COM USO DE CHEQUES EM FORMULARIO CONTINUO               *
000000*    2 - SEM USO DE CHEQUES COM EMISSAO DE RECIBO                *
000000*    3 - SEM USO DE CHEQUES                                      *
000000*    8 - COM USO DE CHEQUES (CLIENTE COM RESTRICOES)             *
000000*                                                                *
000000* DEB307-PER-DEB558    PERIODICIDADE DO DEB558                   *
000000*                      0 - NAO EMITE                             *
000000*                      1 - DIARIO    (ORDEM DE DATA)             *
000000*                      2 - SEMANAL   (ORDEM DE DATA)             *
000000*                      3 - QUINZENAL (ORDEM DE DATA)             *
000000*                      4 - MENSAL    (ORDEM DE DATA)             *
000000*                      5 - EVENTUAL                              *
000000*                      6 - DIARIO    (ORDEM DE DATA DE BALANCETE)*
000000*                      7 - SEMANAL   (ORDEM DE DATA DE BALANCETE)*
000000*                      8 - QUINZENAL (ORDEM DE DATA DE BALANCETE)*
000000*                      9 - MENSAL    (ORDEM DE DATA DE BALANCETE)*
000000*                                                                *
000000* DEB307-TALAO-MES     RETIROU TALAO NO MES                      *
000000*                      0 - NAO                                   *
000000*                      7 - SIM                                   *
000000*                                                                *
000000* DEB307-TRANSFER      TRANSFERENCIA                             *
000000*                      1 - SALDO COM CPMF                        *
000000*                      4 - SALDO SEM CPMF                        *
000000*                      7 - TRF.CONTA (APOS D+1)                  *
000000*                      8 - TRF.CONTA (EM D+1)                    *
000000*                      9 - TRF.CONTA (EM D+0)                    *
000000*                                                                *
000000* DEB307-MOM-TRANSF    1 - PF C/SALDO > 1.000 HA MAIS DE  5 DIAS *
000000*                      2 - PF C/SALDO > 1.000 HA MAIS DE 10 DIAS *
000000*                      3 - PF C/SALDO > 1.000 HA MAIS DE 15 DIAS *
000000*                      4 - PF C/SALDO > 1.000 HA MAIS DE 20 DIAS *
000000*                      5 - PJ C/SALDO > 1.000 HA MAIS DE  5 DIAS *
000000*                      6 - PJ C/SALDO > 1.000 HA MAIS DE 10 DIAS *
000000*                      7 - PJ C/SALDO > 1.000 HA MAIS DE 15 DIAS *
000000*                      8 - PJ C/SALDO > 1.000 HA MAIS DE 20 DIAS *
000000*                                                                *
000000* DEB307-TP-CH-ESP     TIPO DO CHEQUE ESPECIAL                   *
000000*                      0 - NAO TEM                               *
000000*                      1 - OURO                                  *
000000*                      2 - OURO EXECUTIVO                        *
000000*                      3 - CLASSIC                               *
000000*                      4 - OURO EMPRESARIAL                      *
000000*                      5 - UNIVERSITARIO (EX BB-CAMPUS)          *
000000*                      6 - BB GIRO RAPIDO                        *
000000*                      7 - ESPECIAL ELETRONICA                   *
000000*                      8 - ESTILO                                *
000000*                      9 - JOVEM                                 *
000000*                                                                *
000000* DEB307-EMITE-AVISO   EMITE AVISO DE LANCAMENTO                 *
000000*                      0 - NAO EMITE                             *
000000*                      1 - EMITE VIA CORREIOS                    *
000000*                      2 - EMITE VIA AGENCIA                     *
000000*                                                                *
000000* DEB307-DEV-MANUAL    DEVOLUCAO                                 *
000000*                      0 - AUTOMATICA                            *
000000*                      1 - MANUAL                                *
000000*                                                                *
000000* DEB307-RG-IRREG      RG IRREGULAR                              *
000000*                      0 - REGULARIZADO                          *
000000*                      1 - PRIMEIRO TITULAR IRREGULAR            *
000000*                      2 - SEGUNDO  TITULAR IRREGULAR            *
000000*                      3 - PRIMEIRO E SEGUNDO TITULARES          *
000000*                          IRREGULARES                           *
000000*                      9 - SEM RG NO MCI                         *
000000*                                                                *
000000* DEB307-FONE-TALAO    TELEFONE NO TALAO DE CHEQUE               *
000000*                      0 - NAO INCLUI                            *
000000*                      1 - INCLUI DO PRIMEIRO TITULAR            *
000000*                      2 - INCLUI DO SEGUNDO  TITULAR            *
000000*                      3 - INCLUI DOS DOIS TITULARES             *
000000*                                                                *
000000* DEB307-RED-BLOQ      REDUTOR DE BLOQUEIO DE DEPOSITO EM        *
000000*                      NUMERO DE DIAS                            *
000000*                                                                *
000000* DEB307-BLOQ-CARTAO   IDENTIFICA SE A CONTA ESTAH EM PROCESSO   *
000000*                      DE ENCERRAMENTO.                          *
000000*                      0 = NAO ESTAH EM ENCERRAMENTO;            *
000000*                      1 = ESTAH EM ENCERRAMENTO.                *
000000*                                                                *
000000* DEB307-IND-MALA      IDENTIFICA O NIVEL DE RELACIONAMENTO      *
000000*            PESSOA FISICA  (DEB307-PESSOA = 1)                  *
000000*            ----------------------------------                  *
000000*                                                                *
000000*            0 -  A CLASSIFICAR    (COD NO SMI 1111)             *
000000*            1 -  PF A             (COD NO SMI 2012)             *
000000*            2 -  PF B             (COD NO SMI 2112)             *
000000*            3 -  NR C             (COD NO SMI 2202)             *
000000*            4 -  NR D             (COD NO SMI 2302)             *
000000*            5 -  PF E             (COD NO SMI 2712)             *
000000*            6 -  SEM NR           (COD NO SMI 2502)             *
000000*            7 -  PF C             (COD NO SMI 2602)             *
000000*            8 -  PF D             (COD NO SMI 2702)             *
000000*            9 -  PF F             (COD NO SMI 2812)             *
000000*                                                                *
000000*                                                                *
000000*            PESSOA JURIDICA  (DEB307-PESSOA = 2)                *
000000*            ---------------                                     *
000000*            0 - 1111 NAO CLASSIFICAVEL (COD NO SMI 1111)        *
000000*            1 - 6024 MPE : ATEH  244 MIL/ANO                    *
000000*            2 - 6044 MPE : ACIMA 244     ATEH 360 MIL/ANO       *
000000*            3 - 6124 MPE : DE    360 MIL A    1,2 MILHOES       *
000000*            4 - 6204 MPE : DE    1,2     A      5 MILHOES/ANO   *
000000*            5 - 6314 MDE : ACIMA  5      ATEH  10 MILHOES       *
000000*            6 - 6324 MDE : ACIMA 10      ATEH  20 MILHOES       *
000000*            7 - 6404 MDE : DE    20      A     50 MILHOES/ANO   *
000000*            8 - 6504 GDE : DE    50      A    100 MILHOES/ANO   *
000000*            9 - 6604 CRP : ACIMA         DE   100 MILHOES/ANO   *
000000*           -1 - 6804 MICROEMPRESA                               *
000000*           -2 - 6814 PEQUENA EMPRESA I                          *
000000*           -3 - 6824 PEQUENA EMPRESA II                         *
000000*           -4 - 6834 PEQUENA EMPRESA III                        *
000000*                                                                *
000000******************************************************************

