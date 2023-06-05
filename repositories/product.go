package repositories

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProducts() ([]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	CreateProduct(Product models.Product) (models.Product, error)
	UpdateProduct(Product models.Product) (models.Product, error)
	DeleteProduct(Product models.Product, ID int) (models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProducts() ([]models.Product, error) {
	var Products []models.Product
	err := r.db.Preload("Partner").Find(&Products).Error

	return Products, err
}

func (r *repository) GetProduct(ID int) (models.Product, error) {
	var Product models.Product
	err := r.db.Preload("Partner").First(&Product, ID).Error

	return Product, err
}

func (r *repository) CreateProduct(Product models.Product) (models.Product, error) {
	err := r.db.Create(&Product).Error

	return Product, err
}

func (r *repository) UpdateProduct(Product models.Product) (models.Product, error) {
	err := r.db.Save(&Product).Error
	return Product, err
}

func (r *repository) DeleteProduct(Product models.Product, ID int) (models.Product, error) {
	err := r.db.Delete(&Product, ID).Scan(&Product).Error

	return Product, err
}
