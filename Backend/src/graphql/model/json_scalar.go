package model

import (
	"encoding/json"
	"fmt"
	"io"
)

type JSON map[string]interface{}

func (j *JSON) UnmarshalGQL(v interface{}) error {
    // Make sure the input is a map before converting
    m, ok := v.(map[string]interface{})
    if !ok {
        return fmt.Errorf("invalid type %T for JSON", v)
    }
    *j = JSON(m)
    return nil
}

func (j JSON) MarshalGQL(w io.Writer) {
    // Convert the JSON map to JSON string
    json.NewEncoder(w).Encode(j)
}
