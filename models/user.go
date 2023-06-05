package models

type User struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" binding:"required, email" gorm:"unique; not null" validate:"required"`
	Password    string `json:"password" validate:"required"`
	Address     string `json:"address" validate:"required"`
	PhoneNumber string `json:"phone_number" validate:"required"`
	ImageUrl    string `json:"image_url"`
	Role        string `json:"role"`
}

type UserProfileResponse struct {
	Name        string `json:"name" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Password    string `json:"password" validate:"required"`
	Address     string `json:"address" validate:"required"`
	PhoneNumber string `json:"phone_number" validate:"required"`
	ImageUrl    string `json:"image_url"`
	Role        string `json:"role"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}
