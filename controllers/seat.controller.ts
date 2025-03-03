import { Seat } from "../models/seat.model";

export const createSeatsForShow = async (showId: unknown, seatConfig: { row: string, count: number, type: string, price: number }[]) => {

    const seats = [];

    for (const config of seatConfig) {
        for (let i = 0; i <= config.count; i++) {
            seats.push({
                show: showId,
                seatNumber: `${config.row}${i}`,
                type: config.type,
                price: config.price,
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