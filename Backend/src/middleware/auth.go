package middleware

import (
	"errors"
	"fmt"
	"time"

	

	"github.com/dgrijalva/jwt-go"
)

// JWT secret key
var jwtSecret = []byte("your_jwt_secret_key")

// Function to create a JWT token
func CreateToken(userId int) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["userId"] = userId
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix()
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
			fmt.Printf("got the userid from token: %v", userId)
			return int(userId), nil
		}
		fmt.Printf("userId claim not found or invalid type\n")
		return 0, errors.New("userId claim missing or invalid")
	} else {
		return 0, fmt.Errorf("error getting id from token: %v", err)
	}
}
