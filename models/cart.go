package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	ProductID  uint   `gorm:"not null"`
	CustomerID uint   `gorm:"not null"`
	Quantity   uint   `gorm:"not null"`
	Status     string `gorm:"not null"`
	Product    Product
	Customer   User
}

type CartResponse struct {
	gorm.Model
	ProductID  uint   `gorm:"not null"`
	CustomerID uint   `gorm:"not null"`
	Quantity   uint   `gorm:"not null"`
	Status     string `gorm:"not null"`
	Product    Product
	Customer   User
}
