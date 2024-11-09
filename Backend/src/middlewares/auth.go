package middlewares

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"
	"context"

	"github.com/dgrijalva/jwt-go"
)

type ContextKey string

const UserIDKey ContextKey = "userId"

// JWT secret key (replace with a secure secret in production)
var jwtSecret = []byte("your_jwt_secret_key")

// Function to create a JWT token
func CreateToken(userId int) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["userId"] = userId
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix() // 1 hour expiration
	return token.SignedString(jwtSecret)
}

// Function to retrieve user ID from token
func GetUserIDFromToken(tokenString string) (int, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userId, ok := claims["userId"].(float64); ok {
			return int(userId), nil
		}
		return 0, errors.New("userId claim missing or invalid")
	} else {
		return 0, fmt.Errorf("error getting id from token: %v", err)
	}
}

// Function to extract the token from the Authorization header
func ExtractToken(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	if len(authHeader) > 0 {
		parts := strings.Fields(authHeader)
		if len(parts) == 2 && parts[0] == "Bearer" {
			return parts[1]
		}
	}
	return ""
}

// Middleware to validate the token and add the user ID to the request context
func TokenValidationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := ExtractToken(r)
		if tokenString == "" {
			http.Error(w, "Authorization token required", http.StatusUnauthorized)
			return
		}

		userId, err := GetUserIDFromToken(tokenString)
		if err != nil {
			http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, userId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

