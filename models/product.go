package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string  `gorm:"not null"`
	Description string  `gorm:"not null"`
	Price       float64 `gorm:"not null"`
	ImageURL    string  `gorm:"type: varchar(255)"`
	PartnerID   uint    `gorm:"not null"`
	Partner     User    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
