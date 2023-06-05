package repositories

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(Transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
	DeleteTransaction(Transaction models.Transaction, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Preload("Customer").Find(&Transaction).Error

	return Transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.Preload("Customer").First(&Transaction, ID).Error

	return Transaction, err
}

func (r *repository) CreateTransaction(Transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Product").Create(&Transaction).Error

	return Transaction, err
}

func (r *repository) DeleteTransaction(Transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&Transaction, ID).Scan(&Transaction).Error

	return Transaction, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Customer").First(&transaction, orderId)

	if status != transaction.Status && status == "success" {
		var cart models.Cart
		r.db.First(&cart, transaction.CustomerID)
		cart.Status = "success"
		r.db.Save(&cart)
	}

	if status != transaction.Status && status == "cancel" {
		var cart models.Cart
		r.db.First(&cart, transaction.CustomerID)
		cart.Status = "cancel"
		r.db.Save(&cart)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}
