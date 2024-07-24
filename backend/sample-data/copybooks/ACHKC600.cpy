      *================================================================*
      * ACHKC600 - BOOK DA SUBROTINA ACHSC600                          *
      *================================================================*
      *                                                                *
      * VRS001 - 07/03/2024 - F7023235 - IMPLANTACAO.                  *
      *                                                                *
      *================================================================*
      * 1) Objetivo:                                                   *
      *                                                                *
      * Rotina que retorna a classificação taxonômica e contábil de um *
      * produto/modalidade.                                            *
      *                                                                *
      *================================================================*
      * 2) Parâmetros:

           03  ACHSC600-ENTRADA.
               05  ACHSC600-AGENCIA               PIC  S9(005).
               05  ACHSC600-CONTA                 PIC  S9(011).
               05  FILLER                         PIC   X(075).

           03  ACHSC600-SAIDA.
               05  FILLER                         PIC   X(075).
               05  ACHSC600-ERRO.
                   07  ACHSC600-CD-SQL            PIC  S9(003)  COMP-3.
                   07  ACHSC600-CD-RTN            PIC  S9(004)  COMP.
                   07  ACHSC600-MSG-RTN           PIC   X(050).
      *================================================================*
      * 3) Descrição:
      *    ACHSC600-CD-RTN          : > 0, INDICA ERRO
      *    ACHSC600-CD-SQL          : ERRO DE SQL
      *    ACHSC600-MSG-RTN         : DESCRICAO DO ERRO
      *
      *    ACHSC600-CD-CMCP         : CD CARTEIRA MERCADO DE CAPITAIS
      *    ACHSC600-CD-GR-MCP       : CD GRUPO MERCADO DE CAPITAIS
      *    ACHSC600-CD-LMCP         : CD LIVRO DO MERCADO DE CAPITAIS
      *    ACHSC600-CD-SMCP         : CD SUBLIVRO MERCADO DE CAPITAIS
      *    ACHSC600-CD-CLSC-CTB-PAPL: CD TIPO CLASSIFICACAO CONTABIL
      *    ACHSC600-DT-INC-VGC-CLSC : DT INICIO VIGENCIA CLASSIFICACAO
      *    ACHSC600-DT-FIM-VGC-CLSC : DT FINAL VIGENCIA CLASSIFICACAO
      *
      *----------------------------------------------------------------*

