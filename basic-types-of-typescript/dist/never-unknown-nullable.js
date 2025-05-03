"use strict";
{
    //  ====> nullable types =>> when a null value is also acceptable
    const searchName = (value) => {
        if (value) {
            console.log("searching");
        }
        else {
            console.log("There is nothing to search");
        }
    };
    searchName(null);
    //  unknown type  ==> using type of => the type is determined in the runtime
    const getSpeedInMeterPerSecond = (value) => {
        if (typeof value === "number") {
            const convertedSpeed = (value * 1000) / 3600; // converting from km/h to m/s
            console.log(`Speed in meters per second: ${convertedSpeed}`);
        }
        else if (typeof value === "string") {
            const valueInNumber = value.split(" ");
            const convertedSpeed = (parseFloat(valueInNumber[0]) * 1000) / 3600;
            console.log(`Speed in meters per second: ${convertedSpeed}`);
        }
        else {
            console.log("Invalid input: value must be a number");
        }
    };
    getSpeedInMeterPerSecond(`1000 kmh^-1`);
    // ====> Never Type ==> used when throwing an exception
    function throwError(msg) {
        throw new Error(msg);
    }
    throwError("sorry error ho gya");
    //
}
