package database

import (
	"fmt"
	"waysfood/models"
	mysqldo "waysfood/pkg/mysql"
)

func RunMigration() {
	err := mysqldo.DB.AutoMigrate(
		&models.User{},
		&models.Product{},
		&models.Cart{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration failed")
	}

	fmt.Println("Migration Success")
}
