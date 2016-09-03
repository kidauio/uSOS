--PROYECTO DE PRUEBA
--LED AZUL
--gpio4 is 2 - para la version con sub-serial
--gpio2 is 4 - esp-07

-- D0  16
-- D1  5 
-- D2  4
-- D3  GPIO0
-- D4  GPIO2
-- D5  14
-- D6  12
-- D7  13 
-- D8  15

led_blue = 4
gpio.mode(led_blue, gpio.OUTPUT, gpio.PULLUP)

--Ingreso de la entrada digital, GPIO13 (7) por defecto 
sensor_1 = 7
gpio.mode(sensor_1, gpio.INPUT, gpio.PULLUP)

--gpio.write(led_blue, gpio.HIGH)
i=0
j=0
system_run=0
temp=22
hum=13
lat=0.156615
cons_lat=0.001129389
cons_long=0.000153389
long=-78.484988
gpio_dat = 0
company="TAS"
project="ESP8266_TEST"
code="TAx0342"
description="Test_Project"

thing_name="ecx_cfn_thing"

count=0
blink_led = 0

one_run = 0

function dweet()  

    conn=net.createConnection(net.TCP,0)
    conn:on("receive",function(conn,pl)end)--print("response:",pl)end)
    conn:on("connection",function(conn,payload)
    conn:send("POST ?emergency=1 HTTP/1.1\r\nHost: raspberry\r\n".."Connection: close\r\nAccept: */*\r\n\r\n")
    --conn:send("POST /dweet/for/" .. thing_name.. "&?system=" .. system_run ..  " HTTP/1.1\r\nHost: dweet.io\r\n".."Connection: close\r\nAccept: */*\r\n\r\n")
    end)
    conn:connect(8080,"192.168.1.18")
end

function init_i2c_display()
     sda = 8 --GPIO0
     scl = 7 --GPIO2
     sla = 0x3c
     i2c.setup(0, sda, scl, i2c.SLOW)
     disp = u8g.ssd1306_128x64_i2c(sla)
end

function ipget()
    if(myip==nil) then
    myip = wifi.sta.getip()
    mac = wifi.sta.getmac()
    print("IP: ",myip)
    print("MAC:",mac)
    end
    i=myip
    j=mac
    myip=nil
    mac=nil
    
    collectgarbage()
    --print(node.heap())
end

function drawNode()
    --disp:setScale2x2()
    disp:setFont(u8g.font_6x10)
    disp:drawStr( 0, 8, "IEED-TAS Cia. Ltda.")
    --disp:setFont(u8g.font_osb18)
    disp:drawStr( 0, 16, "IP:"..i)
    disp:drawStr( 0, 24, "MAC:")
    disp:drawStr( 0, 32, ""..j)
    disp:drawStr( 0, 40, ""..alt)
    disp:drawStr( 0, 48, ""..count)
    disp:drawStr( 0, 56, ""..system_run)    
end

function test()
    disp:firstPage()
    repeat
      drawNode(draw_state)
    until disp:nextPage() == false
end

function blink()
    lighton=0
    tmr.alarm(0,1000,1,function()
    if lighton==0 then 
        lighton=1 
        --led(512,512,512) 
        -- 512/1024, 50% duty cycle
    else 
        lighton=0 
        --led(0,0,0) 
    end 
    end)
end

function blink2()
    if blink_led == 0 then
        gpio.write(led_blue, gpio.LOW)
        blink_led=1
        else
            if blink_led == 1 then
                gpio.write(led_blue, gpio.HIGH)
                blink_led=0
            end        
    end    
end

function main()      
    tmr.alarm(0, 15, 1, function()        
        temp = math.random(20,30)
        hum = math.random(30,40)        
        lat = lat + cons_lat
        long = long + cons_long
        gpio_dat = gpio.read(sensor_1)        
        count=count+1
        if gpio_dat == 0 and one_run == 0 then
            print (gpio_dat)
            one_run = 1
            dweet()            
        end        
       
        if (count>=200) then
            system_run=1
            one_run = 0
            count = 0
        end
        blink2()
    end )    
end

ipget()
main()
