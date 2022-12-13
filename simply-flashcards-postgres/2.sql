CREATE TABLE users (
  "UserId" uuid PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  "Username" varchar UNIQUE NOT NULL,
  "PasswordHash" bytea NOT NULL,
  "PasswordSalt" bytea NOT NULL
);
