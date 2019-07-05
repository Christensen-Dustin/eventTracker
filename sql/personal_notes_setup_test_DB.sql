-- TEST ACCOUNT (Temple04)
INSERT INTO eventAccount (account_name, account_HASH)
    values ('Dustin1977', '$2y$10$6LZGmYusa/vZPmdLUjhJjOubkciN6sTB/gr59zzpDvvocU5ZtR81W');

-- TEST ENTRY
INSERT INTO eventEntry (entry_content, entry_date, entry_timeline, entry_acct_FK)
    values ('Life has brough me several ideas, few of which I have seen through to the end. I will be finishing my degree, is all goes according to plan, this December.', '2019-06-25', '2019-06-24', 1);

-- TEST THEME (Core - Theme list added upon creation of account <'theme'>, <event_ID_PK>)
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Goal', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Memory', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Event', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Journal', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Marriage', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Personal', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Loss', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Family', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Children', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Spouse', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Birth', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Death', 1);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Love', 1);

-- TEST Additional NOTE to a previous entry/event
INSERT INTO eventNote (note_content, note_date, note_acct_FK)
    values ('The more I think about this journey, the more I wonder if it will ever end. I have been motivated before, but have had to put off finishing my education because of one thing or another. Hopefully I will be able to see it through to the end, as I presently see it ahead of me.', '2019-06-24', 1);

-- TEST CONNECTION between event and theme
INSERT INTO eventThemeConnection (connectE_FK, connectT_FK) values (1, 1);
INSERT INTO eventThemeConnection (connectE_FK, connectT_FK) values (1, 6);

-- TEST CONNECTION between event and note
INSERT INTO eventNoteConnection (connectE_FK, connectN_FK) values (1, 1);


-- Connections between Notes and Entry
CREATE TABLE eventNoteConnection (
    connectEN_ID_PK     serial not null primary key,            -- Event/Note ID
    connectE_FK         INT references eventEntry(entry_ID_PK), -- Foreign Key to Entry
    connectN_FK         INT references eventNote(note_ID_PK)     -- Foreign Key to Note
);