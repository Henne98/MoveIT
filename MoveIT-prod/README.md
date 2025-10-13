# MoveIT

## Setup

Zum Entwickel wird npm oder ein vergleichbares Tool benötigt (z.B. yarn). 
Alle notwendige node modules können über npm install heruntergeladen werden

## Programmieren mit GitHub

GitHub ist ein Programm zur Versionierung von Dateien. Um den sicheren Umgang mit den Dateien zu garantieren wird hier das Programmieren auf mehrere Arten von "branches" aufgeteilt. 

    1. main:
        - Auf dieser Branch läuft die Version, die aktuell live auf dem Server funktioniert
        - Hier wird NIE programmiert, da Änderungen den Server lahmlegen können

    2. prod:
        - Auf diesem Branch werden alle temporären Änderungen gespeichert
        - Auf diesem Branch können kleinere Bugfixes etc. programmiert werden (nicht best practice)
        - Wenn größere Änderungen erstellte werden müssen, kommt die 3. Art der Brnaches hinzu

    3. feature:
        - Dies sind temporäre branches, welche vom Programmierer erstellt werden, wenn größere Änderungen bzw. Neuerungen am Code
          vorgenommen werden 
        - Die feature-branches werden nach merge in prod gelöscht
        - Schema der Benennung: feature-WasWirdProgrammiert

    4. bug:
        - Die bug-branches funktionieren wie die feature-branches
        - werden erstellt, wenn es einen bug gibt, welcher behoben werden soll
        - Schema der Benennung: bug-DasIstDasProblem

### Merging

Die Arbeit mit den 3 Arten von branches werden durch das mergen verbunden. Genau erklärt wird es hier:
https://www.atlassian.com/git/tutorials/using-branches/git-merge

Bitte beachten: 

    - Direkte merges sind NUR von featur-branch zu prod-branch erlaubt, da bei direktem merge auf die main-branch der Server
      unterbrochen werden kann
    - Ein merge von prod auf die main-branch sollte nur erfolgen, wenn sich genug Änderungen angehäuft haben
    - Vor dem merge auf main sollte überprüft werden, ob auf prod alles funktioniert (evtl. überprüfung durch 2. Person)
    - Bei merge-Konflikt: NIEMALS trotz Konfilkt merge durchführen 

## Naming Convention

Alle Namen (Datein, Variablen, Functions, etc.) sollten folgender Naming Convention folgen:

https://dev.to/kristiyanvelkov/react-js-naming-convention-lcg
