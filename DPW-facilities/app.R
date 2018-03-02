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

# Enter Button Code
enterButton <- '
$(function() {
  var $els = $("[data-proxy-click]");
  $.each(
    $els,
    function(idx, el) {
      var $el = $(el);
      var $proxy = $("#" + $el.data("proxyClick"));
      $el.keydown(function (e) {
        if (e.keyCode == 13) {
          $proxy.click();
        }
      });
    }
  );
});
'

keys <- jsonlite::fromJSON("key.json")

google_api <- keys$google_places
google_sv <- keys$gogole_street_view
cg_un <- keys$cgApiUn
cg_pw <- keys$cgApiPw
  
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
}

# Define UI for application that draws a histogram
ui <- fluidPage(
  title = "City Facility Maintenance Request Map",
  tags$head(tags$link(rel = "shortcut icon", type = "image/png", href = "favicon.png")),
  tags$style(type = "text/css", "#map {height: calc(100vh) !important;}
             .container-fluid {padding:0;}"),
  tags$head(tags$script(HTML(enterButton))),
  leafletOutput("map"),
  absolutePanel(top = 5, left = 50, width = '320px', style = "padding: 5px;",
                wellPanel(id = "tPanel", style = "overflow-y: auto; min-height: 10px; max-height: calc(100vh - 10px)",
                          column(10, offset = 0, style='padding:0px;',
                                 tagAppendAttributes(
                                   textInput("geocode",
                                             value = "",
                                             label = NULL,
                                             placeholder = "Go to Address/Place"),
                                   `data-proxy-click` = "btn")
                                 ),
                          column(2, offset = 0, style='padding:0px;',
                                 actionButton("btn",
                                              "",
                                              icon = icon("search-plus"))
                                 )
                          )
  )
)

# Define server logic required to draw a histogram
server <- function(input, output, session) {
  facilitiesLoad <- reactive({
    facilities <- cgShape("cgFacilitiesClass", "Oid,IDField,FacilityTypeField,PrimaryUserField,AddressNumberField,StreetField,ZipCodeField,PrimaryAttachmentField")
    facilities@data <- cbind(facilities@data, coordinates(facilities))
    
    return(facilities)
  })
  output$map <- renderLeaflet({
     facilities <- facilitiesLoad()
     
     leaflet() %>%
       addTiles(urlTemplate = "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga", attribution = 'Google') %>%
       addPolygons(data = facilities, popup = paste0("<b>Facility:</b> ", facilities$IDField,
                                                    "<br><b>Address:</b> ", facilities$AddressNumberField, facilities$StreetField,
                                                    "<br><b>Type:</b> ", facilities$FacilityTypeField,
                                                    "<center>Link Place Holder</center>")
                   ) 
  })
  # Address Zoom
  observeEvent(input$btn, {
    if (input$geocode != "") {
      lookUp <- paste0(gsub(" ", "+", input$geocode), "Pittsburgh,+PA")
      url <- paste0("https://maps.googleapis.com/maps/api/geocode/json?address=", lookUp, "&key=", google_api)
      address <- rlang::flatten(content(GET(url, timeout(500)))$results)
      if (is.list(address)) {
        leafletProxy("map") %>%
          setView(lng = address$geometry$location$lng[1], lat = address$geometry$location$lat[1], zoom = 20)
      }
    }
  })
}

# Run the application 
shinyApp(ui = ui, server = server)