package repositories

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCarts() ([]models.Cart, error)
	GetCart(ID int) (models.Cart, error)
	CreateCart(Cart models.Cart) (models.Cart, error)
	UpdateCart(Cart models.Cart) (models.Cart, error)
	DeleteCart(Cart models.Cart, ID int) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCarts() ([]models.Cart, error) {
	var Carts []models.Cart
	err := r.db.Preload("Product").Preload("Customer").Find(&Carts).Error

	return Carts, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var Cart models.Cart
	err := r.db.Preload("Cart").Preload("Customer").First(&Cart, ID).Error

	return Cart, err
}

func (r *repository) CreateCart(Cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&Cart).Error

	return Cart, err
}

func (r *repository) UpdateCart(Cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&Cart).Error
	return Cart, err
}

func (r *repository) DeleteCart(Cart models.Cart, ID int) (models.Cart, error) {
	err := r.db.Delete(&Cart, ID).Scan(&Cart).Error

	return Cart, err
}
