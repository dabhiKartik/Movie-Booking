import { Seat } from "../models/seat.model";

export const createSeatsForShow = async (showId: unknown, seatConfig: { row: string, count: number, type: string, price: number }[], showDate: string) => {


    
    const seats = [];

    for (const config of seatConfig) {

        const isWeekend = [0,5,6].includes(new Date( showDate).getDate());

        const adjustedPrice  =  isWeekend ? Math.round( config.price*1.1) :config.price

        for (let i = 0; i <= config.count; i++) {
            seats.push({
                show: showId,
                seatNumber: `${config.row}${i}`,
                type: config.type,
                price: adjustedPrice,
                isBooked: false
            });

        }
    }

    return Seat.insertMany(seats)

}

export const getSeatForShow = async (showId: string) => {

    return Seat.find({ show: showId })
}

export const updateSeatBooking = async (seatId: string, isBooked: boolean) => {
    return Seat.findByIdAndUpdate(seatId, { isBooked }, { new: true })


}