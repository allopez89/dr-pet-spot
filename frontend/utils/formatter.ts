interface Interval {
  label: string;
  seconds: number;
}

const intervals: Array<Interval> = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const timeSince = (date: Date): string => {
  const dateF: Date = new Date(date);

  const seconds: number = Math.floor((Date.now() - dateF.getTime()) / 1000);

  const interval:
    | {
        label: string;
        seconds: number;
      }
    | undefined = intervals.find((i) => i.seconds < seconds);

  const count: number = interval ? Math.floor(seconds / interval.seconds) : 0;

  return `${count} ${interval ? interval.label : ""}${
    count !== 1 ? "s" : ""
  } ago`;
};
