package main

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/go-sql-driver/mysql"
)

func deleteExpiredOTP() error {
	now := time.Now().Unix()
	queryString := fmt.Sprintf("DELETE FROM `otp_pending` WHERE `ext` < %s", strconv.FormatInt(now, 10))

	db, errOpenDB := sql.Open("mysql", os.Getenv("DSN"))
	if errOpenDB != nil {
		fmt.Println("Failed to open db connection", errOpenDB)
		return errOpenDB
	}
	defer db.Close()

	_, err := db.Exec(queryString)
	return err
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	err := deleteExpiredOTP()
	statusCode := 200
	if err != nil {
		statusCode = 500
	}

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"content-type": "application/json",
		},
		StatusCode: statusCode,
	}, nil
}

func main() {
	lambda.Start(handler)
}
