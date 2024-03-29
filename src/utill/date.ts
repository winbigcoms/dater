import dayjs, { Dayjs } from "dayjs";

dayjs.locale();

export const get_past_Date = (targetDateString: string) => {
  return Math.abs(dayjs().diff(targetDateString, "d")) + 1;
};

export const get_day_list_10 = (targetDateString: string) => {
  // 100일 단위 및 1주년 체크
  const result: { date: Dayjs; title: string; Dday: number }[] = [];

  const past_date = get_past_Date(targetDateString); // 몇일 지났는지 체크

  const targetDate = dayjs(targetDateString);
  const today = dayjs();
  const [hundred, hundreadRest] = String(past_date / 100).split(".");
  const [year, yearRest] = String(past_date / 365).split(".");
  const numberHundred = Number(hundred);
  const numberYear = Number(year);

  for (let i = numberHundred, u = numberYear; i < 10 + numberHundred; i++) {
    if (i === numberYear && !yearRest) {
      result.push({
        date: today,
        title: `${numberYear}주년`,
        Dday: get_past_Date(today.format("YYYY-MM-DD")),
      });
      continue;
    }
    if (i === numberHundred && !hundreadRest) {
      result.push({
        date: today,
        title: `${numberHundred}백일`,
        Dday: get_past_Date(today.format("YYYY-MM-DD")),
      });
      continue;
    }

    result.push({
      date: targetDate.add((i + 1) * 100 - 1, "d"),
      title: `${(i + 1) * 100}일`,
      Dday: get_past_Date(
        targetDate.add((i + 1) * 100 - 1, "d").format("YYYY-MM-DD")
      ),
    });

    if ((u + 1) * 365 > i * 100 && (u + 1) * 365 < (i + 1) * 100) {
      result.push({
        date: targetDate.add(u + 1, "y"),
        title: `${u + 1}주년`,
        Dday: get_past_Date(targetDate.add(u + 1, "y").format("YYYY-MM-DD")),
      });
      u++;
    }
  }

  return result.sort((a, b) => a.Dday - b.Dday);
};
