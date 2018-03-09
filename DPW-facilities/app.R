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
library(shinyjs)

keys <- jsonlite::fromJSON("key.json")

google_api <- keys$google_places
google_sv <- keys$gogole_street_view
cg_un <- keys$cgApiUn
cg_pw <- keys$cgApiPw

baseUrl<- '$(document).on("shiny:sessioninitialized", function(e) {
var baseUrl = (window.location != window.parent.location)
            ? document.referrer
: document.location.href;
  Shiny.onInputChange("baseUrl", baseUrl);
});'
  

cgShape <- function(class, fields) {
  url <- paste0("https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/classes/", class, "?fields=", fields, ",InactiveField,cgShape")
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
  polys.final[!polys.final$InactiveField,]
}

# Define UI for application that draws a histogram
ui <- fluidPage(
  title = "City Facility Maintenance Request Map",
  # Favicon
  tags$head(tags$link(rel = "shortcut icon", type = "image/png", href = "favicon.png")),
  # Big Map
  tags$style(type = "text/css", '#map {height: calc(100vh - 76px) !important;}
             .container-fluid {
                padding:0; 
                background-image: url("Loading_2.gif");
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-position: center; 
                background-size: 198px 198px; 
             }
             .shiny-input-panel {
                background-color: #fffaee;
                padding: 0px;
                margin: 0px;
                border-left: none;
                border-right: none;
                border-top: none;
                border-bottom-color: black;
                min-height: 76px;
             }
             .selectize-input.items.not-full.has-options {
                width: 300px;
                z: 100;
             }
             .control-label {
                font-weight: normal;
                font-size: 15px;
             }
             .form-group.shiny-input-container {margin: 0px;}
             .shiny-notification-close { display: none;}
             .shiny-notification {
                background-color: transparent;
                border: none;}'),
  # Hide error codes that may appear
  tags$style(type="text/css",
             ".shiny-output-error { visibility: hidden; }
              .shiny-output-error:before { visibility: hidden;}"),
  # Run base URL
  tags$script(baseUrl),
  inputPanel(style = "padding-left: 42px; padding-right: 0px; padding-top: 0px; overflow-y: visible; background-color: #fffaee;",
                uiOutput("search_field")#,
             # HTML('<div style = "position: absolute; right: 24px; top: 13px;">Click on a facility then click the "Submit a Maintenance Request" link!<br></div>')
             ),
  leafletOutput("map")
  )

# Define server logic required to draw a histogram
server <- function(input, output, session) {
  facilitiesLoad <- reactive({
    base <- input$baseUrl
    if (base == "https://pittsburghpa.shinyapps.io/DPW-facilities/") {
      facilities_WPRDC <- readOGR("https://data.wprdc.org/dataset/e33e12d9-1268-45ed-ae47-ae3a76dcc0aa/resource/fd532423-b0ec-4028-98ff-5d414c47e01a/download/facilitiesimg.geojson")
      facilities_WPRDC@data <- facilities_WPRDC@data %>%
        mutate(x = coordinates(facilities_WPRDC)[1],
               y = coordinates(facilities_WPRDC)[2],
               name = as.factor(name),
               address = as.factor(paste0(ifelse(is.na(address_number), "", paste0(as.integer(address_number), " ")), ifelse(is.na(street), "", street))),
               url = paste0('<font size = "4"><a href="https://maintenancerequest.azurewebsites.us/New/WorkOrder?OID=', id, '"target="_top" id = "link">Report an issue</a></font>')) %>%
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
               IDField = as.factor(IDField),
               address = as.factor(paste0(ifelse(is.na(AddressNumberField), "", paste0(AddressNumberField, " ")), ifelse(is.na(StreetField), "", StreetField))),
               image = paste0("https://tools.wprdc.org/images/pittsburgh/facilities/", gsub(" ", "_", IDField), ".jpg"),
               url = paste0('<font size = "4"><a href="', input$baseUrl, 'New/WorkOrder?OID=', facilities$Oid, '"target="_top" id = "link">Report an issue</a></font>')) %>%
        select(-InactiveField)
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
    
    search_list <- c(levels(facilities$IDField), levels(facilities$address))
    
    selectInput("search",
                "Select a facility from the map",
                c(`Search for facilities`='', search_list),
                selectize = TRUE,
                multiple = FALSE)
  })
  output$map <- renderLeaflet({
     facilities <- facilitiesFilter()

     leaflet() %>%
       addTiles(urlTemplate = "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga", attribution = 'Google', options = providerTileOptions(minZoom = 5, maxZoom = 20)) %>%
       addPolygons(data = facilities, popup = paste0('<center><img id="imgPicture" src="', facilities$image, '" style="width:250px; border-radius: 10px 10px 10px 10px;"></center>',
                                                     "<br><b>Facility:</b> ", facilities$IDField,
                                                     "<br><b>Address:</b> ", facilities$address,
                                                     "<br><b>Type:</b> ", facilities$FacilityTypeField,
                                                     '<center>', facilities$url, '</center>')
                   )
  })
  onclick("link", showNotification(tags$style(type = "text/css", "#map { opactity: .2;}")))
  observe({
    zoom <- ifelse(is.null(input$map_zoom), 20, input$map_zoom)
    if (zoom > 20 ) {
      leafletProxy("map", session = session) %>%
        setView(lng = input$map_center[1], lat = input$map_center[2], zoom = 20)
      }
    })
}

# Run the application 
shinyApp(ui = ui, server = server)