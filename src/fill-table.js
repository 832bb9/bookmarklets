const MILISECOND = 1;
const SECOND = MILISECOND * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

const DAYSTART = 10 * HOUR;
const DAYEND = 19 * HOUR;

const timeToString = (time) =>
  `${String(Math.floor(time / HOUR))}:${String(
    Math.floor((time % HOUR) / MINUTE)
  ).padStart(2, "0")}`;

const randomInRange = (start, end) => start + Math.random() * (end - start);

for (const day of [1, 2, 3, 4, 5]) {
  const dayTypeEl = document.querySelector(`[name="DayType${day}"]`);

  if (dayTypeEl.value !== "...") {
    continue;
  }

  const timeInEl = document.querySelector(`[name="TimeIn1D${day}"]`);
  if (!timeInEl.value) {
    timeInEl.value = timeToString(
      DAYSTART + randomInRange(-5 * MINUTE, 5 * MINUTE)
    );
  }

  const timeOutEl = document.querySelector(`[name="TimeOut1D${day}"]`);
  if (!timeOutEl.value) {
    timeOutEl.value = timeToString(
      DAYEND + randomInRange(-5 * MINUTE, 5 * MINUTE)
    );
  }
}
