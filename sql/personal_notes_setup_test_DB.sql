-- TEST ACCOUNT (Temple04)
INSERT INTO eventAccount (account_name, account_HASH)
    values ('Dustin1977', '$2y$10$6LZGmYusa/vZPmdLUjhJjOubkciN6sTB/gr59zzpDvvocU5ZtR81W');
INSERT INTO eventAccount (account_name, account_HASH)
    values ('JeanJY1976', '$2y$10$dMzPbZW1yXj4YObrqlT6j.hLcJvAdPzuvkumGK8e/osC6WsdQ5Q22');

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

INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Goal', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Memory', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Event', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Journal', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Marriage', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Personal', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Loss', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Family', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Children', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Spouse', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Birth', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Death', 2);
INSERT INTO eventTheme (theme_name, theme_acct_FK) values ('Love', 2);

-- TEST Additional NOTE to a previous entry/event
INSERT INTO eventNote (note_content, note_date, note_acct_FK)
    values ('The more I think about this journey, the more I wonder if it will ever end. I have been motivated before, but have had to put off finishing my education because of one thing or another. Hopefully I will be able to see it through to the end, as I presently see it ahead of me.', '2019-06-24', 1);

-- TEST CONNECTION between event and theme
INSERT INTO eventThemeConnection (connectE_FK, connectT_FK) values (1, 1);
INSERT INTO eventThemeConnection (connectE_FK, connectT_FK) values (1, 6);

-- TEST CONNECTION between event and note
INSERT INTO eventNoteConnection (connectE_FK, connectN_FK) values (1, 1);
INSERT INTO eventNoteConnection (connectE_FK, connectN_FK) values (1, 6);
INSERT INTO eventNoteConnection (connectE_FK, connectN_FK) values (1, 7);
INSERT INTO eventNoteConnection (connectE_FK, connectN_FK) values (1, 8);

SELECT theme_ID_PK, theme_name, theme_acct_FK From eventTheme INNER JOIN eventThemeConnection ON theme_ID_PK = connectT_FK inner join eventEntry on connectE_FK=entry_ID_PK where entry_ID_PK=1 AND theme_acct_FK=1;