const getDate = tempData => {
  const formatDate = (date, options, lang) => new Intl.DateTimeFormat(lang, options).format(date);

  const getFormattedDate = options => {
    const lang = 'en-US';
    const date = new Date(tempData.dt_txt);
    return formatDate(date, options, lang);
  };

  return {
    month: getFormattedDate({ month: 'short' }),
    weekday: getFormattedDate({ weekday: 'short' }),
    day: getFormattedDate({ day: 'numeric' }),
    time: getFormattedDate({
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }),
    hour: getFormattedDate({
      hour: 'numeric',
      hour12: false
    })
  };
};

const getTemp = tempData => Math.round(tempData.main.temp);

const getPressure = tempData => tempData.main.pressure;

const getHumidity = tempData => tempData.main.humidity;

const getWeather = tempData => {
  const { id, description, icon } = tempData.weather[0];
  return {
    code: id,
    status: description,
    iconId: icon.slice(0, 2)
  };
};

const getClouds = tempData => tempData.clouds.all;

const getWindSpeed = tempData => Math.round(tempData.wind.speed);

const getWindDirection = tempData => {
  const getWindDirectionId = deg => {
    const numSides = 8;
    const span = 360 / numSides;

    return Math.ceil((deg + span / 2) / span) % numSides;
  };

  return getWindDirectionId(tempData.wind.deg);
};

export default class Weather {
  constructor(tempData, id) {
    this.date = getDate(tempData);
    this.temp = getTemp(tempData);
    this.pressure = getPressure(tempData);
    this.humidity = getHumidity(tempData);
    this.weather = getWeather(tempData);
    this.clouds = getClouds(tempData);
    this.windSpeed = getWindSpeed(tempData);
    this.windDirection = getWindDirection(tempData);
    this.id = id;
  }
}
