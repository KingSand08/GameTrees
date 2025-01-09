const convertTo24Hour = (time: string): string => {
    const [hours, minutes, period] = time.match(/(\d+):(\d+)\s(AM|PM)/i)?.slice(1) || [];
    let hours24 = parseInt(hours, 10);
    if (period.toUpperCase() === "PM" && hours24 !== 12) {
        hours24 += 12;
    } else if (period.toUpperCase() === "AM" && hours24 === 12) {
        hours24 = 0;
    }
    return `${hours24.toString().padStart(2, "0")}:${minutes}:00`;
};

const convertHoursArrayTo24Hour = (
    hoursArray: { day: string; start_time: string; end_time: string }[]
): { day: string; start_time: string; end_time: string }[] => {
    return hoursArray.map(hour => ({
        ...hour,
        start_time: convertTo24Hour(hour.start_time),
        end_time: convertTo24Hour(hour.end_time),
    }));
};

export { convertTo24Hour, convertHoursArrayTo24Hour };