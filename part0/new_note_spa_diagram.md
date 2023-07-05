```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Write note and submit 
    browser->>browser: Re-render the notes

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server


```