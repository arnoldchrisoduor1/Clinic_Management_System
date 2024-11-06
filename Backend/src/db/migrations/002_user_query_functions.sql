-- Name: users/queries.sql
-- Description: CRUD operations for users table

-- Create a new user
CREATE OR REPLACE FUNCTION create_user(
    p_username VARCHAR(50),
    p_password_hash VARCHAR(255),
    p_email VARCHAR(255),
    p_phone VARCHAR(20),
    p_token VARCHAR(255)
    p_role user_role
) RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO users (username, password_hash, email, phone, token, role)
    VALUES (p_username, p_password_hash, p_email, p_phone, p_token, p_role)
    RETURNING users.id, users.username, users.email, users.phone, users.role, users.token, users.is_active, users.created_at, users.updated_at;
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
    token VARCHCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.id, users.username, users.email, users.token, users.phone, users.role, users.is_active, users.created_at, users.updated_at
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
    token VARCHCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
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
    token VARCHCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM users WHERE users.username = p_username;
END;
$$ LANGUAGE plpgsql;

-- Get all users with pagination
CREATE OR REPLACE FUNCTION get_all_users(
    p_limit INTEGER DEFAULT 10,
    p_offset INTEGER DEFAULT 0
) RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.id, users.username, users.email, users.token, users.phone, users.role, users.is_active, users.created_at, users.updated_at
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
    p_is_active BOOLEAN DEFAULT NULL
) RETURNS TABLE (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(255),
    phone VARCHAR(20),
    role user_role,
    is_active BOOLEAN,
    token VARCHCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    UPDATE users u
    SET 
        username = COALESCE(p_username, u.username),
        email = COALESCE(p_email, u.email),
        phone = COALESCE(p_phone, u.phone),
        role = COALESCE(p_role, u.role),
        is_active = COALESCE(p_is_active, u.is_active)
    WHERE u.id = p_id
    RETURNING u.id, u.username, u.email, u.phone, u.role, u.is_active, u.created_at, u.updated_at u.token;
END;
$$ LANGUAGE plpgsql;

-- Update user password
CREATE OR REPLACE FUNCTION update_user_password(
    p_id INTEGER,
    p_password_hash VARCHAR(255)
) RETURNS BOOLEAN AS $$
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
) RETURNS BOOLEAN AS $$
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