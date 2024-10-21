CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL DEFAULT 'PATIENT',
    isVerified BOOLEAN DEFAULT FALSE,
    resetpasswordtoken VARCHAR(255),
    resetpasswordexpiresat TIMESTAMP WITH TIME ZONE,
    verificationtokenexpiresat TIMESTAMP WITH TIME ZONE,
    verificationtoken VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creating index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);