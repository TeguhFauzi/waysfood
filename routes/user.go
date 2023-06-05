package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	mysqldo "waysfood/pkg/mysql"
	"waysfood/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysqldo.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", h.GetUser)
	e.PATCH("/user/:id", middleware.Auth(middleware.UploadFile(h.UpdateUser)))
	e.DELETE("/user/:id", middleware.Auth(h.DeleteUser))
}
