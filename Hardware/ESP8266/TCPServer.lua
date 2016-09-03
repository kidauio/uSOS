led1 = 4
led2 = 7
gpio.mode(led1, gpio.OUTPUT)
gpio.write(led1, gpio.HIGH)
--gpio.write(led2, gpio.LOW)

--TCP Server
srv = net.createServer(net.TCP)
srv:listen(80, function(conn)
    conn:on("receive", function(conn, payload)
    s = string.match(payload,".+HTTP")
    if s == nil then
        conn:send("Bad Reguest")print("Bad Reguest".. payload) conn:on("sent",function(conn) conn:close() end)
    else
        local buf = "";
            print(payload)        
            buf = buf.."<!DOCTYPE html>"
            buf = buf.."<!--"
            buf = buf.."Copyright (c) 2009-2016 IEED-TAS CIA. LTDA."
            buf = buf.."-->"
            buf = buf.."<html>"
            buf = buf.."<head>"
            buf = buf.."<title>ES8266 IoT ecx</title>"
            buf = buf.."</head>"
            buf = buf.."<body>"        
            buf = buf.."<h1> ESP8266 Web Server</h1>";
            buf = buf.."<p>GPIO0 <a href=\"?pin=ON1\"><button>ON</button></a>&nbsp;<a href=\"?pin=OFF1\"><button>OFF</button></a></p>";
            buf = buf.."<p>GPIO2 <a href=\"?pin=ON2\"><button>ON</button></a>&nbsp;<a href=\"?pin=OFF2\"><button>OFF</button></a></p>";
            buf = buf.."<form action=\"/\" method='get'>"
            --buf = buf.."<form action='msg'>"
            buf = buf.."<P>"
            buf = buf.."Led 1<br>"
            buf = buf.."<INPUT type=\"radio\" name=\"LED1\" value=\"1\">On<BR>"
            buf = buf.."<INPUT type=\"radio\" name=\"LED1\" value=\"0\">Off<BR>"
            buf = buf.."SSID:<INPUT type='text' name='ssid' size=50><BR>"
            buf = buf.."Password:<INPUT type='text' name='pswd' size=50><BR>"
            buf = buf.."<INPUT type=\"submit\" value=\"Send\"> <INPUT type=\"reset\">"
            buf = buf.."</P>"
            buf = buf.."</form>"
            --buf = buf.."<img src=\"Logo-GoogleAps.png\"/>";
            --buf = buf.."<img src=\"Icon.png\"/>";
            buf = buf.."</body>"        
            buf = buf.."</html>"
            conn:send(buf);
            --client:send(buf);
            --conn:close();
            --collectgarbage();
            
            --BUSCAR STRINGS PARA GENERAR ACCIONES
            s = string.find(payload,"?pin=ON1")
            if(s == nil) then
                --print("comando desconocido")
                else
                gpio.write(led1, gpio.HIGH)
            end

            s = string.find(payload,"?pin=OFF1")
            if(s == nil) then
                --print("comando desconocido")
                else                
                gpio.write(led1, gpio.LOW)
            end

            s = string.find(payload,".+LED1=1")
            if(s == nil) then
                --print("comando desconocido")
                else                
                gpio.write(led1, gpio.HIGH)
            end

            s = string.find(payload,".+LED1=0")
            if(s == nil) then
                --print("comando desconocido")
                else                
                gpio.write(led1, gpio.LOW)
            end

            ssid = string.match(payload,"?ssid=(%w+)&*")
            print(ssid)
            pswd = string.match(payload,"&pswd=(%w+)")
            print(pswd)
            if ssid == nil then
                print("error ssid")
            else
                if pswd == nil then
                    print("error password")
                else
                    wifi.setmode(1)
                    wifi.sta.config(ssid,pswd)
                    wifi.sta.connect()
                    tmr.alarm(1, 1000, 1, function()
                        if wifi.sta.getip()== nil then
                            print("IP unavaiable, Waiting...")
                        else
                            tmr.stop(1)
                             print("ESP8266 mode is: " .. wifi.getmode())
                             print("The module MAC address is: " .. wifi.ap.getmac())
                             print("Config done, IP is "..wifi.sta.getip())
                             dofile ("dweet.lua")
                        end
                    end)                    
                end
            end
        end
    end)
    conn:on("sent", function(conn) conn:close() end)
end)
