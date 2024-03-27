       IDENTIFICATION DIVISION.
       PROGRAM-ID. ACHPCT99.
       AUTHOR. F7023235.
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SPECIAL-NAMES.
           DECIMAL-POINT IS COMMA.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
      *    SELECT ACH601S ASSIGN TO UT-S-ACH601S.
       DATA DIVISION.
       FILE SECTION.
      *FD  ACH601S
      *    BLOCK  0
      *    RECORD 020
      *    RECORDING F.

      *01  REGISTRO-ACH601S  PIC X(020).
      *01  FILLER REDEFINES REGISTRO-ACH601S.
      *    03  DT-CCL-CTBL   PIC X(10).
      *    03  REG-C        PIC 9(5) COMP.
      *    03  FILLER        PIC X(6).


      *
       WORKING-STORAGE SECTION.

       01  REGISTRO-ACH601S.
           03  DT-CCL-CTBL   PIC X(10).
           03  REG-C         PIC S9(11)V COMP-3.
           03  FILLER        PIC X(6).
       PROCEDURE DIVISION.
      *    OPEN OUTPUT ACH601S.

           MOVE "01.03.2024"   TO DT-CCL-CTBL.
           MOVE 12345          TO REG-C.

      *    WRITE REGISTRO-ACH601S.


           DISPLAY LENGTH OF REG-C.

      *    CLOSE ACH601S.

           STOP RUN.
      * ----------------------------------------------------------------
