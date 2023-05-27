CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  msisdn VARCHAR(24),
  name VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE logistics (
  id_logistics VARCHAR(255) PRIMARY KEY,
  logistic_name VARCHAR(255),
  amount INT,
  destination VARCHAR(255),
  origin VARCHAR(255),
  duration VARCHAR(255)
);

INSERT INTO logistics (id_logistics, logistic_name, amount, destination, origin, duration)
VALUES ('1', 'JNE', 10000, 'JAKARTA', 'BEKASI', '2-4');