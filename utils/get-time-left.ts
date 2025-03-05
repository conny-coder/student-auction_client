export const getTimeLeft = (endTime: string) => {
  const endDate = new Date(endTime);

  const currentDate = new Date();

  const timeRemaining = endDate.getTime() - currentDate.getTime();

  if (timeRemaining <= 0) return "00:00:00:00";

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const formatTime = (unit: number) => (unit < 10 ? `0${unit}` : `${unit}`);

  return `${formatTime(days)}:${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;
};
