export const convertTimeStringToMinutes = (timeString: string) => {
	// Split the time and period (AM/PM)
	const [time, modifier] = timeString.split(" ");

	// Split the hours and minutes
	let [hours, minutes]: string[] = time.split(":");

	// Convert hours to a number
	let hoursNumber = parseInt(hours, 10);

	// Convert hours to a 24-hour format
	if (modifier === "PM" && hoursNumber !== 12) {
		hoursNumber += 12;
	}
	if (modifier === "AM" && hoursNumber === 12) {
		hoursNumber = 0;
	}

	// Convert everything to minutes
	const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

	return totalMinutes;
};

export const getGreeting = (timestamp: string): string => {
	// Get the current date and time
	const hours = timestamp.split(" ")[1].split(":")[0] as unknown as number;

	// Define greeting messages based on the time of day
	if (hours >= 5 && hours < 12) {
		return "Good Morning!";
	} else if (hours >= 12 && hours < 17) {
		return "Good Afternoon!";
	} else if (hours >= 17 && hours < 22) {
		return "Good Evening!";
	} else {
		return "Good Night!";
	}
};
