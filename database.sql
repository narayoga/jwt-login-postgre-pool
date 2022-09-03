CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE dashboard;

create table users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL UNIQUE,
    user_role TEXT NOT NULL,
    user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name, user_role, user_password) VALUES ('asa', 'admin', '123123123');

--psql -U postgres
--\c dashboard
--\dt
