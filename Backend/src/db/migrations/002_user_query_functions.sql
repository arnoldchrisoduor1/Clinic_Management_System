-- Create a new user
CREATE OR REPLACE FUNCTION create_user(
    p_username VARCHAR(50),
    p_password_hash VARCHAR(255),
    p_email VARCHAR(255),
    p_phone VARCHAR(20),
    p_role user_role
)
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO users (
        username, password_hash, email, phone, role,
        last_login
    )
    VALUES (
        p_username, p_password_hash, p_email, p_phone, p_role,
        CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
    )
    RETURNING
        users.id, users.username, users.email, users.phone, users.role, users.is_active,
        users.is_verified, users.id_number, users.last_login, users.reset_password_token,
        users.reset_password_expires_at, users.verification_token, users.verification_token_expires_at,
        users.other_details, users.created_at, users.updated_at;
END;
$$ LANGUAGE plpgsql;

-- Get a user by ID
CREATE OR REPLACE FUNCTION get_user_by_id(p_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHAR(255),
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.id, users.username, users.email, users.phone, users.role, users.is_active, users.token,
        users.is_verified, users.id_number, users.last_login, users.reset_password_token, users.reset_password_expires_at,
        users.verification_token, users.verification_token_expires_at, users.other_details, users.created_at, users.updated_at
    FROM users 
    WHERE users.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Get a user by email
CREATE OR REPLACE FUNCTION get_user_by_email(p_email VARCHAR(255))
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    password_hash VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHAR(255),
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM users WHERE users.email = p_email;
END;
$$ LANGUAGE plpgsql;

-- Get a user by username
CREATE OR REPLACE FUNCTION get_user_by_username(p_username VARCHAR(50))
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    password_hash VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHAR(255),
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM users WHERE users.username = p_username;
END;
$$ LANGUAGE plpgsql;

-- Get all users with pagination
CREATE OR REPLACE FUNCTION get_all_users(
    p_limit INTEGER DEFAULT 10,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHAR(255),
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.id,
        users.username,
        users.email,
        users.phone,
        users.role,
        users.is_active,
        users.token,
        users.is_verified,
        users.id_number,
        users.last_login,
        users.reset_password_token,
        users.reset_password_expires_at,
        users.verification_token,
        users.verification_token_expires_at,
        users.other_details,
        users.created_at,
        users.updated_at
    FROM users
    ORDER BY users.id
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- Update a user
CREATE OR REPLACE FUNCTION update_user(
    p_id INTEGER,
    p_username VARCHAR(50) DEFAULT NULL,
    p_email VARCHAR(255) DEFAULT NULL,
    p_phone VARCHAR(20) DEFAULT NULL,
    p_role user_role DEFAULT NULL,
    p_is_active BOOLEAN DEFAULT NULL,
    p_id_number NUMERIC DEFAULT NULL,
    p_other_details JSONB DEFAULT NULL,
    p_is_verified BOOLEAN DEFAULT NULL,
    p_reset_password_token VARCHAR(255) DEFAULT NULL,
    p_reset_password_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    p_verification_token VARCHAR(255) DEFAULT NULL,
    p_verification_token_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHAR(255),
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    UPDATE users u
    SET 
        username = COALESCE(p_username, u.username),
        email = COALESCE(p_email, u.email),
        phone = COALESCE(p_phone, u.phone),
        role = COALESCE(p_role, u.role),
        is_active = COALESCE(p_is_active, u.is_active),
        id_number = COALESCE(p_id_number, u.id_number),
        other_details = COALESCE(p_other_details, u.other_details),
        is_verified = COALESCE(p_is_verified, u.is_verified),
        reset_password_token = COALESCE(p_reset_password_token, u.reset_password_token),
        reset_password_expires_at = COALESCE(p_reset_password_expires_at, u.reset_password_expires_at),
        verification_token = COALESCE(p_verification_token, u.verification_token),
        verification_token_expires_at = COALESCE(p_verification_token_expires_at, u.verification_token_expires_at)
    WHERE u.id = p_id
    RETURNING 
        u.id, u.username, u.email, u.phone, u.role, u.is_active, u.token, u.is_verified, u.id_number, u.last_login,
        u.reset_password_token, u.reset_password_expires_at, u.verification_token, u.verification_token_expires_at, u.other_details,
        u.created_at, u.updated_at;
END;
$$ LANGUAGE plpgsql;

-- Update user password
CREATE OR REPLACE FUNCTION update_user_password(
    p_id INTEGER,
    p_password_hash VARCHAR(255)
)
RETURNS BOOLEAN AS $$
DECLARE
    rows_updated INTEGER;
BEGIN
    UPDATE users
    SET password_hash = p_password_hash
    WHERE users.id = p_id;
    
    GET DIAGNOSTICS rows_updated = ROW_COUNT;
    RETURN rows_updated > 0;
END;
$$ LANGUAGE plpgsql;

-- Delete a user
CREATE OR REPLACE FUNCTION delete_user(p_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    rows_deleted INTEGER;
BEGIN
    WITH deleted AS (
        DELETE FROM users
        WHERE users.id = p_id
        RETURNING *
    )
    SELECT COUNT(*) INTO rows_deleted FROM deleted;
    
    RETURN rows_deleted > 0;
END;
$$ LANGUAGE plpgsql;

-- Check if user exists
CREATE OR REPLACE FUNCTION user_exists(
    p_username VARCHAR(50) DEFAULT NULL,
    p_email VARCHAR(255) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE (p_username IS NOT NULL AND username = p_username)
           OR (p_email IS NOT NULL AND email = p_email)
    );
END;
$$ LANGUAGE plpgsql;

-- Get user count
CREATE OR REPLACE FUNCTION get_users_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM users);
END;
$$ LANGUAGE plpgsql;

-- Update user token
CREATE OR REPLACE FUNCTION update_user_token(
    p_id INTEGER,
    p_token VARCHAR(255)
)
RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHAR(255),
    is_verified BOOLEAN,
    id_number NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    other_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
AS $$
BEGIN
    RETURN QUERY
    UPDATE users u
    SET
        token = COALESCE(p_token, u.token)
    WHERE u.id = p_id
    RETURNING 
        u.id, u.username, u.email, u.phone, u.role, u.is_active, u.token, u.is_verified, u.id_number, u.last_login,
        u.reset_password_token, u.reset_password_expires_at, u.verification_token, u.verification_token_expires_at, u.other_details,
        u.created_at, u.updated_at;
END;
$$ LANGUAGE plpgsql;