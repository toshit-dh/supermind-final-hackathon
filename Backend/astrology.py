import swisseph as swe

from datetime import datetime

gemstone_suggestions = {
    "Aries": "Ruby",
    "Taurus": "Emerald",
    "Gemini": "Agate",
    "Cancer": "Moonstone",
    "Leo": "Peridot",
    "Virgo": "Sapphire",
    "Libra": "Opal",
    "Scorpio": "Topaz",
    "Sagittarius": "Turquoise",
    "Capricorn": "Garnet",
    "Aquarius": "Amethyst",
    "Pisces": "Aquamarine"
}

def calculate_zodiac(birth_date, birth_time):
    birth_datetime = datetime.strptime(f"{birth_date} {birth_time}", "%Y-%m-%d %H:%M")
    jd_ut = swe.julday(birth_datetime.year, birth_datetime.month, birth_datetime.day,
                       birth_datetime.hour + birth_datetime.minute / 60)
    sun_longitude = swe.calc(jd_ut, swe.SUN)[0][0]
    zodiac_signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius',
                    'Capricorn', 'Aquarius', 'Pisces']
    sign = zodiac_signs[int((sun_longitude + 30) % 360 / 30)]
    stone = get_gemstone_suggestion(sign)
    return [sign,stone]


def get_gemstone_suggestion(zodiac_sign):
    gemstone = gemstone_suggestions.get(zodiac_sign, "No gemstone found")
    return gemstone