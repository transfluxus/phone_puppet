var client;
ui.addButton("Go!", 0, 200, ui.screenWidth, 150).onClick(function() {
    var updateInterval = 10;
    var updateCount = 0;
    var absX = 0;
    var absY = 0;

    client = network.connectOSC("192.168.2.141", 3333);

    sensors.gyroscope.onChange(function(x, y, z) {
        absX += x;
        absY += y;
        // absZ += z;

        if( absX >= 300.0 )
            absX = 300.0;
        else if( absX <= -300.0 )
            absX = -300.0;

        if( absY >= 300.0 )
            absY = 300.0;
        else if( absY <= -300.0 )
            absY = -300.0;

        updateCount++;
        if( updateCount % updateInterval === 0 ) {
            updateCount = 0;

            var o = [];
            o.push( ( absX / 300.0 ) * 2.0 );
            o.push( ( absY / 300.0 ) * 2.0 );
            client.send("leftarm", o);
        }
      }
   );
});

//stop gyro
ui.addButton("Stop Gyro", 0, 400, ui.screenWidth, 150).onClick(function() {
    dashboard.show(false);
    sensors.gyroscope.stop();
});
