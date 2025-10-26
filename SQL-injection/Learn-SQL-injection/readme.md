# MySQL / MariaDB Cheat Sheet (Kali-focused)

> **TL;DR** — Copy-paste ready commands for daily MySQL/MariaDB work on Kali (Debian). Use `sudo mysql` or `mysql -u root -p` to connect. Includes DB/table/column CRUD, rows (DML), SELECT patterns, indexes, users, transactions, backups, imports, service control, and quick diagnostics.

---

## Quick connect

```bash
# Kali (socket) — preferred
sudo mysql

# Or with password prompt
mysql -u root -p

# Remote host/port
mysql -u user -p -h 10.0.0.5 -P 3306
```

---

## Databases (CRUD)

```sql
SHOW DATABASES;                -- list databases
CREATE DATABASE demo_db;       -- create db
USE demo_db;                   -- switch to db
DROP DATABASE demo_db;         -- delete db (destructive)
```

---

## Tables (create / show / describe / drop)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW TABLES;
DESCRIBE users;                -- columns and types
SHOW CREATE TABLE users\G;    -- full CREATE statement
DROP TABLE users;              -- remove table
TRUNCATE TABLE users;          -- delete all rows (keeps structure)
```

---

## Columns (add / modify / rename / drop)

```sql
ALTER TABLE users ADD COLUMN last_login DATETIME AFTER email;
ALTER TABLE users MODIFY COLUMN email VARCHAR(150) NOT NULL;
ALTER TABLE users CHANGE COLUMN username user_name VARCHAR(80);
ALTER TABLE users DROP COLUMN last_login;
```

---

## Insert / Update / Delete rows (DML)

```sql
-- insert single row
INSERT INTO users (username, email) VALUES ('haseeb', 'h@ex.com');

-- insert multiple
INSERT INTO users (username, email) VALUES
  ('alice','a@ex.com'),
  ('bob','b@ex.com');

-- update
UPDATE users SET email = 'bob@new.com' WHERE username = 'bob';

-- delete rows
DELETE FROM users WHERE id = 3;

-- delete all rows (fast)
TRUNCATE TABLE users;
```

---

## SELECT essentials

```sql
SELECT * FROM users;
SELECT id, username FROM users WHERE email LIKE '%@ex.com' ORDER BY id DESC LIMIT 10;

-- aggregations
SELECT COUNT(*) AS total, DATE(created_at) AS day
FROM users
GROUP BY day
HAVING total > 5
ORDER BY day DESC;

-- joins
SELECT u.username, p.title
FROM users u
JOIN posts p ON p.user_id = u.id
LEFT JOIN comments c ON c.post_id = p.id
WHERE u.id = 2;

-- paging
SELECT * FROM big_table LIMIT 20 OFFSET 40;
```

---

## Indexes & foreign keys

```sql
CREATE INDEX idx_users_email ON users (email);
DROP INDEX idx_users_email ON users;

-- foreign key (ensure compatible engines/types)
ALTER TABLE posts
  ADD COLUMN user_id INT,
  ADD CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id);

SHOW INDEX FROM users;
```

---

## Transactions

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;            -- or ROLLBACK; to undo
```

---

## Users & privileges

```sql
CREATE USER 'webuser'@'localhost' IDENTIFIED BY 'S3cret!';
GRANT SELECT, INSERT, UPDATE ON demo_db.* TO 'webuser'@'localhost';
FLUSH PRIVILEGES;   -- sometimes required

REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'webuser'@'localhost';
DROP USER 'webuser'@'localhost';
```

Notes: MariaDB and MySQL versions differ slightly in auth syntax (e.g., caching_sha2_password). Adjust if needed.

---

## Diagnostics / status / processes

```sql
SHOW PROCESSLIST;           -- current connections
SHOW FULL PROCESSLIST;      -- full queries
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';
SHOW ENGINE INNODB STATUS\G;
```

Shell (service) diagnostics:

```bash
sudo systemctl status mysql
sudo journalctl -u mysql -n 200 --no-pager
mysql --version
mariadb --version
```

Kill a running query from inside client:

```sql
KILL <process_id>;
```

Get approximate table sizes:

```sql
SELECT table_schema, table_name,
       ROUND((data_length+index_length)/1024/1024,2) AS size_mb
FROM information_schema.TABLES
WHERE table_schema = 'demo_db'
ORDER BY size_mb DESC;
```

---

## Backup & restore (shell)

```bash
# single DB
mysqldump -u root -p demo_db > demo_db_dump.sql

# all DBs
mysqldump -u root -p --all-databases > all_databases.sql

# restore
mysql -u root -p demo_db < demo_db_dump.sql
# or inside mysql client
SOURCE /path/to/dump.sql;
```

---

## Import CSV

```sql
-- recommended: place file in secure_file_priv dir or enable local infile
LOAD DATA INFILE '/var/lib/mysql-files/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(username, email, created_at);

-- if local infile required on client
mysql --local-infile=1 -u root -p
```

---

## Kali (Debian) service / config paths

```bash
# socket path
/run/mysqld/mysqld.sock   # also /var/run/mysqld/mysqld.sock

# main configs
/etc/mysql/my.cnf
/etc/mysql/mariadb.conf.d/50-server.cnf

# service
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl restart mysql
sudo systemctl enable mysql    # start on boot
sudo systemctl disable mysql   # prevent autostart
```

---

## Windows quick notes

```powershell
# start/stop
net start MySQL80
net stop MySQL80

# connect
mysql -u root -p

# dump
mysqldump -u root -p demo_db > C:\dumps\demo_db.sql
```

Service name may vary: `MySQL`, `MySQL80`, `MySQL57`.

---

## Handy aliases (add to ~/.bashrc)

```bash
# start service and open client
alias mysqlstart='sudo systemctl start mysql && sudo mysql'

# quick dump
alias mysqldumpdb='mysqldump -u root -p'
```

---

## Example outputs

```
MariaDB [(none)]> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
```

```
$ mysql --version
mysql  Ver 15.1 Distrib 10.11.3-MariaDB, for debian-linux-gnu (x86_64) using readline 8.2
```

---

## Notes & tips

* MariaDB is a drop-in compatible server for MySQL; most commands are identical.
* Use `--only-upgrade` with `apt` to update a single package: `sudo apt --only-upgrade install mariadb-server`.
* Be careful with `DROP` and `TRUNCATE` — they are destructive.
* When importing large dumps, disable foreign_key_checks and unique_checks to speed up, then re-enable.

---

If you want, I can also:

* produce a printable one-page `README.md` file (this is already the file on the canvas),
* generate a small helper script (`mysqlstart`) and place copy-paste ready content,
* or trim this into a 1-page PDF or GitHub-ready README with badges.
