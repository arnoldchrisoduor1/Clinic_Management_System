package utils

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	// generate a bcrypt hash of the password.
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

// Chaecking the password.
func CheckPassword(password, hash string) error {
	// attempting to sompare the password and hash
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	if err != nil {
		// Differentiate between incorrect password and other errors.
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return errors.New("incorrect password")
		}
		// Return a generic error if something else goes wrong
		return errors.New("failed to compare password and hash: "  + err.Error())
	}
	return nil
}