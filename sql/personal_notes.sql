-- DATA BASE for Second Semester Project

-- Account information
CREATE TABLE eventAccount (
    account_ID_PK       serial not null primary key,    -- account ID
    account_name        varchar(80) not null unique,    -- additional unique marker
    account_HASH        varchar(255) not null unique    -- password HASH
);

-- Event Entry
CREATE TABLE eventEntry (
    entry_ID_PK     serial not null primary key,        -- entry ID
    entry_content   text not null,                      -- content of the entry
    entry_date      DATE not null,                      -- date entry was made
    entry_timeline  DATE,                               -- When event might have occurred
    entry_acct_FK   int references eventAccount(account_ID_PK)  -- Foreign Key to account
);

-- Theme or type of event
CREATE TABLE eventTheme (
    theme_ID_PK     serial not null primary key,    -- theme ID
    theme_name      varchar(80) not null,           -- name of theme or type
    theme_acct_FK   int references eventAccount(account_ID_PK)  -- Foreign Key to account
);

-- Additional notes related to a event or entry
CREATE TABLE eventNote (
    note_ID_PK      serial not null primary key,    -- note ID
    note_content    text not null,                  -- content of the note
    note_date       DATE not null,                  -- date of note entry
    note_acct_FK    int references eventAccount(account_ID_PK)  -- Foreign Key to account
);

-- Connections between Theme and Entry
CREATE TABLE eventThemeConnection (
    connectET_ID_PK     serial not null primary key,            -- Event/Theme ID
    connectE_FK         INT references eventEntry(entry_ID_PK), -- Foreign Key to Entry
    connectT_FK         INT references eventTheme(theme_ID_PK)  -- Foreign Key to Theme
);

-- Connections between Notes and Entry
CREATE TABLE eventNoteConnection (
    connectEN_ID_PK     serial not null primary key,            -- Event/Note ID
    connectE_FK         INT references eventEntry(entry_ID_PK), -- Foreign Key to Entry
    connectN_FK         INT references eventNote(note_ID_PK)     -- Foreign Key to Note
);

-- Create a user
CREATE USER et_user WITH PASSWORD 'elijah';

-- Set up access for the user
GRANT SELECT, INSERT, UPDATE ON eventAccount TO et_user;
GRANT SELECT, INSERT, UPDATE ON eventEntry TO et_user;
GRANT SELECT, INSERT, UPDATE ON eventTheme TO et_user;
GRANT SELECT, INSERT, UPDATE ON eventNote TO et_user;
GRANT SELECT, INSERT, UPDATE ON eventThemeConnection TO et_user;
GRANT SELECT, INSERT, UPDATE ON eventNoteConnection TO et_user;

-- Set up permission for usage
GRANT USAGE, SELECT ON SEQUENCE eventAccount_account_ID_PK_seq TO et_user;
GRANT USAGE, SELECT ON SEQUENCE eventEntry_entry_ID_PK_seq TO et_user;
GRANT USAGE, SELECT ON SEQUENCE eventTheme_theme_ID_PK_seq TO et_user;
GRANT USAGE, SELECT ON SEQUENCE eventNote_note_ID_PK_seq TO et_user;
GRANT USAGE, SELECT ON SEQUENCE eventThemeConnection_connectET_ID_PK_seq TO et_user;
GRANT USAGE, SELECT ON SEQUENCE eventNoteConnection_connectEN_ID_PK_seq TO et_user;


