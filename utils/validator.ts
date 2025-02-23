import validator from 'validator';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

export const emailValidator = (email: string) => {
    if (!validator.isEmail(email)) {
        throw new Error("invalid email")
    }
    return email

}

export const StrongPassword = (password: string) => {
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please use strong password")
    }
    return password
}



export const validMobileNumber = (mobileNumber: string) => {
    // Parse the input mobile number
    const phoneNumber = parsePhoneNumber(mobileNumber, 'IN');

    // Check if the parsed number is valid and belongs to India
    if (!phoneNumber || !phoneNumber.isValid() || phoneNumber.country !== 'IN') {
        throw new Error('Please provide a valid Indian mobile number');
    }

    // Return the formatted number including the country code
    return phoneNumber.formatInternational();
};

export const validDate =(releaseDate: string )=>{
if(!validator.isDate(releaseDate,{format:'DD/MM/YYYY',strictMode:true})) throw new Error("please provide valid Date formate")
    return releaseDate;
}  

