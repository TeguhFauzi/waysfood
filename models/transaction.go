package models

import (
	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	ID         uint   `gorm:"primaryKey"`
	CustomerID uint   `gorm:"not null"`
	PartnerID  uint   `gorm:"not null"`
	Status     string `gorm:"not null"`
	Location   string `gorm:"not null"`
	TotalPrice int    `gorm:"not null"`
	Customer   User
}
