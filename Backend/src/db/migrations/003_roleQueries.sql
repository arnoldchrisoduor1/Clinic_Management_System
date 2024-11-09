-- Name: roles/queries.sql
-- Description: CRUD operations for roles table

-- Create a new role
CREATE OR REPLACE FUNCTION create_role(
    p_name VARCHAR(50),
    p_permissions JSONB
) RETURNS TABLE (
    id INTEGER,
    name VARCHAR(50),
    permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO roles (name, permissions)
    VALUES (p_name, p_permissions)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

-- Get a role by ID
CREATE OR REPLACE FUNCTION get_role_by_id(p_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    name VARCHAR(50),
    permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM roles WHERE roles.id = p_id;
END;
$$ LANGUAGE plpgsql;

-- Get a role by name
CREATE OR REPLACE FUNCTION get_role_by_name(p_name VARCHAR(50))
RETURNS TABLE (
    id INTEGER,
    name VARCHAR(50),
    permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM roles WHERE roles.name = p_name;
END;
$$ LANGUAGE plpgsql;

-- Get all roles
CREATE OR REPLACE FUNCTION get_all_roles()
RETURNS TABLE (
    id INTEGER,
    name VARCHAR(50),
    permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM roles ORDER BY id;
END;
$$ LANGUAGE plpgsql;

-- Update a role
CREATE OR REPLACE FUNCTION update_role(
    p_id INTEGER,
    p_name VARCHAR(50),
    p_permissions JSONB
) RETURNS TABLE (
    id INTEGER,
    name VARCHAR(50),
    permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    UPDATE roles
    SET 
        name = COALESCE(p_name, name),
        permissions = COALESCE(p_permissions, permissions)
    WHERE roles.id = p_id
    RETURNING *;
END;
$$ LANGUAGE plpgsql;

-- Delete a role
CREATE OR REPLACE FUNCTION delete_role(p_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    rows_deleted INTEGER;
BEGIN
    WITH deleted AS (
        DELETE FROM roles
        WHERE id = p_id
        RETURNING *
    )
    SELECT COUNT(*) INTO rows_deleted FROM deleted;
    
    RETURN rows_deleted > 0;
END;
$$ LANGUAGE plpgsql;

-- Check if role exists by name
CREATE OR REPLACE FUNCTION role_exists_by_name(p_name VARCHAR(50))
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM roles WHERE name = p_name
    );
END;
$$ LANGUAGE plpgsql;