var config = {
    address: "", // Empty as running in a docker container.
    port: 8080, // Update port in HASS.IO configuration and not here.
    ipWhitelist: [], // Empty as in docker container, ACL from the host.

    //
    // The settings below are for a basic setup, please modifiy as needed. 
    //
    language: "en",
    timeFormat: 24,
    units: "imperial",
    customCss: "css/custom.css",

    modules: [
        {
            module: "alert",
        },
        {
            module: "updatenotification",
            position: "top_bar"
        },
        {
            module: 'MMM-OnScreenMenu',
            position: 'bottom_right',
            config: {
                touchMode: true,
                enableKeyboard: true,
                menuItems: {
                    notify1: {  title: "Home", 
                        icon: "home", 
                        notification: "PAGE_CHANGED", 
                        payload: 0 },
                    notify2: {  title: "Comics", 
                        icon: "comment", 
                        notification: "PAGE_CHANGED", 
                        payload: 1 },
                    notify3: {  title: "Home Assistant", 
                        icon: "house-signal", 
                        notification: "PAGE_CHANGED", 
                        payload: 2 },
                    notify4: {  title: "Google", 
                        icon: "chrome", 
                        notification: "PAGE_CHANGED", 
                        payload: 3 },
                    notify5: {  title: "GoogleMapsTraffic", 
                        icon: "chrome", 
                        notification: "PAGE_CHANGED", 
                        payload: 4 }
                }
            }
        },
        {
            module: "MMM-pages",
            config: {
                modules: [
                        [ "calendar", "clock","weatherforecast","currentweather","newsfeed", "MMM-HASS", "MMM-homeassistant-sensors" ],
                        [ "DailyXKCD" ],
                        [ "MMM-iFrame" ],
                        [ "MMM-GoogleFit","MMM-GoogleMapsTraffic"]
                ],
                excludes: ["alert", "updatenotification", "MMM-OnScreenMenu"],
            }            
        },    
        {
            module: 'MMM-iFrame',
            position: 'fullscreen_below',	// This can be any of the regions.
            config: {
                    url: ["http://192.168.0.111:8123/lovelace/overview"],
                    updateInterval: 60 * 60 * 1000,// Refresh every 60 minutes
                    width: "100%",
                    height: "1000px"
                }
        },
        {
            module: "DailyXKCD",
            position: 'top_left',
            config: {
                invertColors: true,
                showTitle: true,
                showAltText: false
            }            
        },
        {
            module: "clock",
            position: "top_left"
        },
        {
            module: "calendar",
            header: "US Holidays",
            position: "top_left",
            config: {
                calendars: [
                    {
                        symbol: "calendar-check-o ",
                        url: "webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics"
                    },
                    {    symbol: "calendar-check-o",
                        url: "https://calendar.google.com/calendar/ical/basic.ics"
                    }
                ]
            }
        },
        {
            module: "compliments",
            position: "lower_third"
        },
        {
            module: "currentweather",
            position: "top_right",
            config: {
                location: "Anytown,US",
                locationID: "8675309",  //ID from http://www.openweathermap.org/help/city_list.txt
                appid: ""
            }
        },
        {
            module: "weatherforecast",
            position: "top_right",
            header: "Weather Forecast",
            config: {
                location: "anytown,US",
                locationID: "8675309",  //ID from http://www.openweathermap.org/help/city_list.txt
                appid: ""
            }
        },
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [
                    {
                        title: "New York Times",
                        url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
                    },
				{
					title: "BBC",
					url: "http://feeds.bbci.co.uk/news/video_and_audio/news_front_page/rss.xml?edition=uk",
				},
				{
					title: "Propublica",
					url: "http://feeds.propublica.org/propublica/main",
				},{ title: "Reddit",url: "http://www.reddit.com/r/news+worldnews+politics+upliftingnews+fridaynewsdump+todayilearned+.rss"}
                ],
                showSourceTitle: true,
                showPublishDate: true,
                ignoreOldItems: true,
                ignoreOlderThan: 864000000
            }
        },
        {
                module: "MMM-HASS",
                position: "top_left",
                config: {
                        host: "http://192.168.0.111", // Special docker ha api proxy
                        port: "8123",
                        https: false,
			            hassiotoken: true,
                        devices: [
                        { deviceLabel: "Exterior",
                                deviceReadings: [
                                { sensor: "sensor.yr_temperature", icon: "wi wi-thermometer", suffix: "°"},
                                { sensor: "sensor.yr_humidity", icon: "wi wi-humidity", suffix: "%"}
                                ]
                        },
                        { deviceLabel: "Interior",
                                deviceReadings: [
                                { sensor: "sensor.home_temperature", icon: "wi wi-thermometer", suffix: "°", notification: "INDOOR_TEMPERATURE"},
                                { sensor: "sensor.home_humidity", icon: "wi wi-humidity", suffix: "%"}
                                ]
                        },
                        { deviceLabel: "Internet",
                                deviceReadings: [
                                { sensor: "sensor.speedtest_download", icon: "fa fa-tachometer-alt", suffix: ""}
                                ]
                        }
                        ]
                  }
        },        
        {
		    module: 'MMM-homeassistant-sensors',
		    position: 'top_left',
            config: 
            {
			    host: 'http://192.168.0.111', // Special docker ha api proxy
			    port: '8123',
			    https: false,
			    prettyName: false,
                stripName: false,
                token: "token",
                values:
                [
                    {
					sensor: "sensor.alarm_panel_display",
                    icons: 
                    [
                        {
							"default":"alarm-check",
						}
					]
				}, {
					sensor: "binary_sensor.motion_sensor",
					icons: [{
							"state_off": "run",
							"state_on": "run-fast"
						}
					]
                },
                {
					sensor: "switch.alarm_chime",
					icons: [
                        {
							"state_off": "lightbulb-outline",
							"state_on": "lightbulb-on-outline"
						}
					]
                }
                ]
            }
        },
        {
            module: 'MMM-GoogleFit',
            position: 'top_right',
            config: {
                displayWeight: 'false' 
            }
        },
        {
            module: 'MMM-GoogleMapsTraffic',
            position: 'top_left',
            config: {
                key: 'key',
                lat: '00.00',
                lng: '-00.00',
                height: '300px',
                width: '300px',
                styledMapType: "transparent",
                disableDefaultUI: true,
                backgroundColor: 'hsla(0, 0%, 0%, 0)'
            }
        }
/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
