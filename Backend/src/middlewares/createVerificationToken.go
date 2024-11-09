package middlewares

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"time"
)

// generate a 6-digit random verification code
func GenerateVerificationCode() (int, error) {
	max := big.NewInt(1000000)
	code, err := rand.Int(rand.Reader, max)
	if err != nil {
		return 0, err
	}
	return int(code.Int64()), nil
}

// Function to verify user token and return a new verification, if needed
func VerifyUserToken(userExpiresAt time.Time) (int, error) {
	if time.Now().After(userExpiresAt) {
		code, err := GenerateVerificationCode()
		if err != nil {
			return 0, fmt.Errorf("error: generating verification code: %v", err)
		}
		fmt.Println("success: generated new verification code:", code)
		return code, nil
	}
	fmt.Println("success: verification token is still valid")
		return 0, nil
}