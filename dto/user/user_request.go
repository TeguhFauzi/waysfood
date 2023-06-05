package userdto

type UpdateUserRequest struct {
	Name        string `json:"name" form:"name"`
	Email       string `json:"email" form:"email" `
	Password    string `json:"password" form:"password" `
	Address     string `json:"address" form:"address" `
	PhoneNumber string `json:"phone_number" form:"phone_number" `
	ImageUrl    string `json:"image_url" form:"image_url"`
}
