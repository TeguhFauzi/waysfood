package handlers

import (
	"net/http"
	"strconv"
	cartDto "waysfood/dto/cart"
	dto "waysfood/dto/result"
	"waysfood/models"
	"waysfood/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerCart struct {
	CartRepository repositories.CartRepository
}

func HandlerCart(CartRepository repositories.CartRepository) *handlerCart {
	return &handlerCart{CartRepository}
}

func (h *handlerCart) FindCarts(c echo.Context) error {
	Carts, err := h.CartRepository.FindCarts()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Carts})
}

func (h *handlerCart) GetCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var Cart models.Cart
	Cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Cart})
}

func (h *handlerCart) CreateCart(c echo.Context) error {
	productID, _ := strconv.Atoi(c.FormValue("product_id"))
	customerID, _ := strconv.Atoi(c.FormValue("customer_id"))
	qty, _ := strconv.Atoi(c.FormValue("qty"))

	request := cartDto.CreateCartRequest{
		ProductID:  uint(productID),
		CustomerID: uint(customerID),
		Quantity:   uint(qty),
		Status:     c.FormValue("status"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// data form pattern submit to pattern entity db product
	cart := models.Cart{
		ProductID:  request.ProductID,
		CustomerID: request.CustomerID,
		Quantity:   request.Quantity,
		Status:     request.Status,
	}

	data, err := h.CartRepository.CreateCart(cart)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerCart) UpdateCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	cart, err := h.CartRepository.GetCart(id)

	qty, _ := strconv.Atoi(c.FormValue("qty"))

	request := cartDto.UpdateCartRequest{
		Quantity: uint(qty),
		Status:   c.FormValue("status"),
	}

	if request.Quantity != 0 {
		cart.Quantity = request.Quantity
	}
	if request.Status != "" {
		cart.Status = request.Status
	}

	data, err := h.CartRepository.UpdateCart(cart)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerCart) DeleteCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.CartRepository.DeleteCart(cart, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertCartResponse(data)})
}

func convertCartResponse(u models.Cart) models.CartResponse {
	return models.CartResponse{
		ProductID:  u.ProductID,
		CustomerID: u.CustomerID,
		Quantity:   u.Quantity,
		Status:     u.Status,
		Customer:   u.Customer,
	}
}
