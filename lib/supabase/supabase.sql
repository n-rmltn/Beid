
CREATE TYPE transaction_type AS ENUM (
  'QR_PAYMENT',
  'CARD_PAYMENT', 
  'CASHBACK',
  'RECEIVE_FUND'
);

CREATE TYPE card_type AS ENUM (
  'DEBIT',
  'CREDIT'
);

CREATE TYPE transaction_direction AS ENUM (
  'INCOMING',
  'OUTGOING'
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(19,4) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  recipient_reference VARCHAR(255),
  transaction_type transaction_type NOT NULL,
  card_type card_type,
  direction transaction_direction NOT NULL,
  source VARCHAR(255),
  destination VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access" 
ON transactions
FOR SELECT 
TO PUBLIC
USING (true);