000010******************************************************************
000011*                                                                *
000012*   PREFIXO / NUMERO ULTIMA OPERACAO PARA O ESCAI (PREJUIZO)     *
000013*                                                                *
000030******************************************************************
000031* VRS001 16.08.2005 ROSSANA     IMPLANTACAO.                     *
000100******************************************************************
000101*
000102 01  DEB1122-REG-GERAL           PIC  X(13)     VALUE SPACES.
000103 01  DEB1122-REG-HEADER  REDEFINES  DEB1122-REG-GERAL.
000104     03 FILLER                   PIC  X(08).
000105     03 DEB1122-DT-MOV-AMD       PIC S9(09)     COMP-3.
000106*
000107 01  DEB1122-REG-DETALHE REDEFINES  DEB1122-REG-GERAL.
000108     03 DEB1122-PREFIXO          PIC S9(05)     COMP-3.
000109     03 DEB1122-OPERACAO         PIC S9(09)     COMP-3.
000110     03 DEB1122-DT-ULT-AMD       PIC S9(09)     COMP-3.
000111*
000112 01  DEB1122-REG-TRAILER REDEFINES  DEB1122-REG-GERAL.
000113     03 FILLER                   PIC  X(08).
000114     03 DEB1122-QT-REG-DET       PIC S9(09)     COMP-3.

000107 01  FILLER REDEFINES  DEB1122-REG-GERAL.
000114     03 DEB1122-QT-REG-DET       PIC S9(09)     COMP-3.
000160******************************************************************
000161*                                                                *
000162* DESCRICAO DOS CAMPOS:                                          *
000163* =====================                                          *
000164*                                                                *
000165* DEB1122-PREFIXO    - PREFIXO DA DEPENDENCIA                    *
000166*                      - NO HEADER CONTEM 00000                  *
000167*                      - NO TRAILER CONTEM 99999                 *
000168*                                                                *
000169* DEB1122-OPERACAO   - NUMERO DA ULTIMA OPERACAO                 *
000170*                      - NO HEADER CONTEM 000000000              *
000171*                      - NO TRAILER CONTEM 999999999             *
000172*                                                                *
000173* DEB1122-DT-MOV-AMD - DATA DO MOVIMENTO NO FORMATO AAAAMMDD     *
000174*                                                                *
000175* DEB1122-DT-ULT-AMD - DATA DA ULTIMA ALTERACAO NO FORMATO       *
000176*                      AAAAMMDD                                  *
000177*                                                                *
000178* DEB1122-QT-REG-DET - QUANTIDADE DE REGISTROS DETALHE           *
000179*                                                                *
000250******************************************************************
