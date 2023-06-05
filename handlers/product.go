package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	productDto "waysfood/dto/product"
	dto "waysfood/dto/result"
	"waysfood/models"
	"waysfood/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

var path_file = "http://localhost:5000/uploads/"

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(productRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{productRepository}
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	Products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Products})
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	price, _ := strconv.ParseFloat(c.FormValue("price"), 64)
	partnerID, _ := strconv.Atoi(c.FormValue("partner_id"))

	request := productDto.CreateProductRequest{
		Name:        c.FormValue("name"),
		Description: c.FormValue("description"),
		Price:       price,
		ImageURL:    dataFile,
		PartnerID:   uint(partnerID),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "Waysfood"})

	if err != nil {
		fmt.Println(err.Error())
	}
	// data form pattern submit to pattern entity db product
	product := models.Product{
		Name:        request.Name,
		Description: request.Description,
		ImageURL:    resp.SecureURL,
		Price:       request.Price,
		PartnerID:   request.PartnerID,
	}

	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: converProductResponse(data)})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "Waysfood"})

	if err != nil {
		fmt.Println(err.Error())
	}

	price, _ := strconv.ParseFloat(c.FormValue("price"), 64)
	partnerID, _ := strconv.Atoi(c.FormValue("partner_id"))

	request := productDto.CreateProductRequest{
		Name:        c.FormValue("name"),
		Description: c.FormValue("description"),
		Price:       price,
		ImageURL:    resp.PublicID,
		PartnerID:   uint(partnerID),
	}

	if request.Name != "" {
		product.Name = request.Name
	}
	if request.ImageURL != "" {
		product.ImageURL = request.ImageURL
	}
	if request.Price != 0 {
		product.Price = request.Price
	}
	if request.PartnerID != 0 {
		product.PartnerID = request.PartnerID
	}
	if request.Description != "" {
		product.Description = request.Description
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	film, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(film, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: converProductResponse(data)})
}

func converProductResponse(u models.Product) productDto.CreateProductResponse {
	return productDto.CreateProductResponse{
		ID:          strconv.Itoa(int(u.ID)),
		Name:        u.Name,
		Description: u.Description,
		ImageURL:    u.ImageURL,
		Price:       u.Price,
		PartnerID:   u.PartnerID,
	}
}
