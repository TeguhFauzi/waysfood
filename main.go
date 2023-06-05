package main

import (
	"fmt"
	"os"
	"waysfood/database"
	mysqldo "waysfood/pkg/mysql"
	"waysfood/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	mysqldo.DatabaseInit()
	database.RunMigration()

	routes.RouteInit(e.Group("/api/v1"))

	var PORT = os.Getenv("PORT")

	fmt.Println("Server is runnning on localhost:" + PORT)
	e.Logger.Fatal(e.Start(":" + PORT))

}
