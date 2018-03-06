# Facilities Request Map
# Organization: City of Pittsburgh
# Dept: Innovation & Performance
# Team: Analytics & Strategy
# Author: Geoffrey Arnold

library(shiny)
library(leaflet)
library(httr)
library(sp)
library(maptools)
library(jsonlite)
library(dplyr)
library(reshape2)
library(tools)
library(rgdal)

keys <- jsonlite::fromJSON("key.json")

google_api <- keys$google_places
google_sv <- keys$gogole_street_view
cg_un <- keys$cgApiUn
cg_pw <- keys$cgApiPw

baseUrl<- '$(document).on("shiny:connected", function(e) {
var baseUrl = (window.location != window.parent.location)
            ? document.referrer
: document.location.href;
  Shiny.onInputChange("baseUrl", baseUrl);
});'
  
cgShape <- function(class, fields) {
  url <- paste0("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/", class, "?fields=", fields, ",cgShape")
  request <- GET(url, authenticate(cg_un, cg_pw, type = "basic"))
  content <- content(request, as = "text")
  load <- jsonlite::fromJSON(content)[[class]]
  coords <- load$CgShape$Points
  df <- load
  df$CgShape <- NULL
  count <- 1
  for (i in 1:length(coords)) {
    # Flip coords so Polygon reads correctly
    coords_t <- as.data.frame(coords[i])[c(2,1)]
    p <- Polygon(coords_t)
    ps <- Polygons(list(p),i)
    if (count == 1) {
      polys <-  SpatialPolygons(list(ps), proj4string=CRS("+proj=utm +north +zone=16T + datum=WGS84"))
      count <- 2
    } else {
      temp <-  SpatialPolygons(list(ps), proj4string=CRS("+proj=utm +north +zone=16T + datum=WGS84"))
      # Bind old polygons to new
      polys <- spRbind(polys, temp)
    }
  }
  polys.final <- SpatialPolygonsDataFrame(polys, df, match.ID = TRUE)
}

# Define UI for application that draws a histogram
ui <- fluidPage(
  title = "City Facility Maintenance Request Map",
  # Favicon
  tags$head(tags$link(rel = "shortcut icon", type = "image/png", href = "favicon.png")),
  # Big Map
  tags$style(type = "text/css", '#map {height: calc(100vh) !important;}
             .container-fluid {
                padding:0; 
                background-image: url("Loading_2.gif");
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: center; 
             }'),
  # Hide error codes that may appear
  tags$style(type="text/css",
             ".shiny-output-error { visibility: hidden; }",
             ".shiny-output-error:before { visibility: hidden;}"),
  # Run base URL
  tags$script(baseUrl),
  leafletOutput("map"),
  absolutePanel(top = 5, left = 50, width = '320px', style = "padding: 5px; overflow-y: visible;",
                uiOutput("search_field")
    )
  )

# Define server logic required to draw a histogram
server <- function(input, output, session) {
  facilitiesLoad <- reactive({
    if (input$baseUrl == "https://pittsburghpa.shinyapps.io/DPW-facilities/") {
      facilities_WPRDC <- readOGR("https://data.wprdc.org/dataset/e33e12d9-1268-45ed-ae47-ae3a76dcc0aa/resource/fd532423-b0ec-4028-98ff-5d414c47e01a/download/facilitiesimg.geojson")
      facilities_WPRDC@data <- facilities_WPRDC@data %>%
        mutate(x = coordinates(facilities_WPRDC)[1],
               y = coordinates(facilities_WPRDC)[2],
               address = paste0(ifelse(is.na(address_number), "", paste0(address_number, " ")), ifelse(is.na(street), "", toTitleCase(tolower(street)))),
               url = paste0('<a href="https://maintenancerequest.azurewebsites.us/New/WorkOrder?OID=', id, '"target="_parent">Submit a Maintence Request</a>')) %>%
        rename(Oid = id,
               AddressNumberField = address_number,
               StreetField = street,
               IDField = name,
               FacilityTypeField = type,
               PrimaryUserField = primary_user)
      facilities <- facilities_WPRDC
    } else {
      facilities <- cgShape("cgFacilitiesClass", "Oid,IDField,FacilityTypeField,PrimaryUserField,AddressNumberField,StreetField")
      facilities@data <- facilities@data %>% 
        mutate(x = coordinates(facilities)[1],
               y = coordinates(facilities)[2],
               address = paste0(ifelse(is.na(AddressNumberField), "", paste0(AddressNumberField, " ")), ifelse(is.na(StreetField), "", toTitleCase(tolower(StreetField)))),
               image = paste0("https://tools.wprdc.org/images/pittsburgh/facilities/", gsub(" ", "_", IDField), ".jpg"),
               url = paste0('<a href="', input$baseUrl, 'New/WorkOrder?OID=', facilities$Oid, '"target="_parent">Submit a Maintence Request</a>')) 
    }
    
    return(facilities)
  })
  facilitiesFilter <- reactive({
    # Search Filter
    facilities <- facilitiesLoad()
  
    if (!is.null(input$search) && input$search != "") {
      facilities <- facilities[apply(facilities@data, 1, function(row){any(row %in% input$search)}), ]
    }
    
    return(facilities)
  })
  output$search_field <- renderUI({
    facilities <- facilitiesLoad()
    cols <- facilities@data %>% 
      select(IDField, FacilityTypeField, PrimaryUserField, address)  
    
    cols$indx <- row.names(cols)
    
    search_single <- melt(cols, "indx") %>% 
      filter(!is.na(value) & value != " " & value != "")
    
    search_list <- levels(as.factor(search_single$value))

    selectInput("search",
                NULL,
                c(`Search`='', search_list),
                selectize = TRUE,
                multiple = TRUE)
  })
  output$map <- renderLeaflet({
     facilities <- facilitiesFilter()
     
     leaflet() %>%
       addTiles(urlTemplate = "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga", attribution = 'Google') %>%
       addPolygons(data = facilities, popup = paste0('<center><img id="imgPicture" src="', facilities$image, '" style="width:250px;"></center>',
                                                     "<br><b>Facility:</b> ", facilities$IDField,
                                                     "<br><b>Address:</b> ", facilities$address,
                                                     "<br><b>Type:</b> ", facilities$FacilityTypeField,
                                                     '<center>', facilities$url, '</center>')
                   )
  })
}

# Run the application 
shinyApp(ui = ui, server = server)