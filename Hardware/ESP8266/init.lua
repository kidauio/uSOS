wifi.sta.config("TAS","1717153827")
wifi.setmode(1)
fail_counter=0
wifi.sta.connect()
tmr.alarm(1, 2000, 1, function()
    if wifi.sta.getip()== nil then
        print("IP unavaiable, Waiting...")
        fail_counter = fail_counter + 1
    else
        tmr.stop(1)
        print("ESP8266 mode is: " .. wifi.getmode())
        print("The module MAC address is: " .. wifi.ap.getmac())
        print("Config done, IP is "..wifi.sta.getip())
        dofile ("dweet.lua")
    end
    
    if fail_counter >=10 then
        tmr.stop(1)
        wifi.setmode(wifi.SOFTAP)
        dofile ("TCPServer.lua")
    end
end)
--wifi.setmode(2)
--dofile ("TCPServer.lua")