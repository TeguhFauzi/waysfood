package userdto

type UserResponse struct {
	ID          uint   `json:"id" `
	Name        string `json:"name" `
	Email       string `json:"email" `
	Password    string `json:"password" `
	Address     string `json:"address" `
	PhoneNumber string `json:"phone_number" `
	ImageUrl    string `json:"image_url"`
}
