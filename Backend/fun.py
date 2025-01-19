# Function to extract specific properties dynamically
def extract_property(data, property_path):
    keys = property_path.split('.')
    result = data

    for key in keys:
        if isinstance(result, dict) and key in result:
            result = result[key]
        elif isinstance(result, list):
            try:
                result = result[int(key)]  # If the key is an index for a list
            except ValueError:
                continue  # Skip if it's not a valid index or key
        else:
            return None  # Return None if the key doesn't exist

    return result


# Example usage:
# Extract "nakshatra" from the long data
def extract_data(dataStatus):
    data = dataStatus["data"]
    nakshatra = extract_property(data, "nakshatra_details.nakshatra.name")
    pada = extract_property(data, "nakshatra_details.nakshatra.pada")
    chandra_rasi = extract_property(data, "nakshatra_details.chandra_rasi.name")
    ganam = extract_property(data, "nakshatra_details.additional_info.ganam")
    nadi = extract_property(data, "nakshatra_details.additional_info.nadi")
    has_mangal_dosha = extract_property(data, "mangal_dosha.has_dosha")
    mangal_desc = extract_property(data, "mangal_dosha.description")
    remedies = extract_property(data, "mangal_dosha.remedies")
    # Accessing each yoga's properties
    print(data['yoga_details'])
    has_Gajakesari_Yoga = data['yoga_details'][0]['yoga_list'][0]['has_yoga']
    Gajakesari_Yoga_description = data['yoga_details'][0]['yoga_list'][0]['description']

    has_Kedar_Yoga = data['yoga_details'][0]['yoga_list'][1]['has_yoga']
    Kedar_Yoga_description = data['yoga_details'][0]['yoga_list'][1]['description']

    has_Kahal_Yoga = data['yoga_details'][0]['yoga_list'][2]['has_yoga']
    Kahal_Yoga_description = data['yoga_details'][0]['yoga_list'][2]['description']

    has_Kamal_Yoga = data['yoga_details'][0]['yoga_list'][3]['has_yoga']
    Kamal_Yoga_description = data['yoga_details'][0]['yoga_list'][3]['description']

    has_Musala_Yoga = data['yoga_details'][0]['yoga_list'][4]['has_yoga']
    Musala_Yoga_description = data['yoga_details'][0]['yoga_list'][4]['description']

    has_Raja_Yoga = data['yoga_details'][0]['yoga_list'][5]['has_yoga']
    Raja_Yoga_description = data['yoga_details'][0]['yoga_list'][5]['description']

    has_Ruchaka_Yoga = data['yoga_details'][0]['yoga_list'][6]['has_yoga']
    Ruchaka_Yoga_description = data['yoga_details'][0]['yoga_list'][6]['description']

    has_Bhadra_Yoga = data['yoga_details'][0]['yoga_list'][7]['has_yoga']
    Bhadra_Yoga_description = data['yoga_details'][0]['yoga_list'][7]['description']

    has_Hamsa_Yoga = data['yoga_details'][0]['yoga_list'][8]['has_yoga']
    Hamsa_Yoga_description = data['yoga_details'][0]['yoga_list'][8]['description']

    has_Malavya_Yoga = data['yoga_details'][0]['yoga_list'][9]['has_yoga']
    Malavya_Yoga_description = data['yoga_details'][0]['yoga_list'][9]['description']

    has_Sasa_Yoga = data['yoga_details'][0]['yoga_list'][10]['has_yoga']
    Sasa_Yoga_description = data['yoga_details'][0]['yoga_list'][10]['description']

    has_Sunafa_Yoga = data['yoga_details'][1]['yoga_list'][0]['has_yoga']
    Sunafa_Yoga_description = data['yoga_details'][1]['yoga_list'][0]['description']

    has_Anafa_Yoga = data['yoga_details'][1]['yoga_list'][1]['has_yoga']
    Anafa_Yoga_description = data['yoga_details'][1]['yoga_list'][1]['description']

    has_Durudhara_Yoga = data['yoga_details'][1]['yoga_list'][2]['has_yoga']
    Durudhara_Yoga_description = data['yoga_details'][1]['yoga_list'][2]['description']

    has_Kemadruma_Yoga = data['yoga_details'][1]['yoga_list'][3]['has_yoga']
    Kemadruma_Yoga_description = data['yoga_details'][1]['yoga_list'][3]['description']

    has_Veshi_Yoga = data['yoga_details'][2]['yoga_list'][0]['has_yoga']
    Veshi_Yoga_description = data['yoga_details'][2]['yoga_list'][0]['description']

    has_Vaasi_Yoga = data['yoga_details'][2]['yoga_list'][1]['has_yoga']
    Vaasi_Yoga_description = data['yoga_details'][2]['yoga_list'][1]['description']

    has_Ubhayachari_Yoga = data['yoga_details'][2]['yoga_list'][2]['has_yoga']
    Ubhayachari_Yoga_description = data['yoga_details'][2]['yoga_list'][2]['description']

    has_Daridra_Yoga = data['yoga_details'][3]['yoga_list'][0]['has_yoga']
    Daridra_Yoga_description = data['yoga_details'][3]['yoga_list'][0]['description']

    has_Grahan_Yoga = data['yoga_details'][3]['yoga_list'][1]['has_yoga']
    Grahan_Yoga_description = data['yoga_details'][3]['yoga_list'][1]['description']

    has_Shakat_Yoga = data['yoga_details'][3]['yoga_list'][2]['has_yoga']
    Shakat_Yoga_description = data['yoga_details'][3]['yoga_list'][2]['description']

    has_Chandal_Yoga = data['yoga_details'][3]['yoga_list'][3]['has_yoga']
    Chandal_Yoga_description = data['yoga_details'][3]['yoga_list'][3]['description']

    has_Kuja_Yoga = data['yoga_details'][3]['yoga_list'][4]['has_yoga']
    Kuja_Yoga_description = data['yoga_details'][3]['yoga_list'][4]['description']

    has_Kemdrum_Yoga = data['yoga_details'][3]['yoga_list'][5]['has_yoga']
    Kemdrum_Yoga_description = data['yoga_details'][3]['yoga_list'][5]['description']

    row = {
        "nakshatra": nakshatra,
        "pada": pada,
        "chandra_rasi": chandra_rasi,
        "ganam": ganam,
        "nadi": nadi,
        "has_mangal_dosha": has_mangal_dosha,
        "mangal_desc": mangal_desc,
        "remedies": remedies,
        "has_Gajakesari_Yoga": has_Gajakesari_Yoga,
        "Gajakesari_Yoga_description": Gajakesari_Yoga_description,
        "has_Kedar_Yoga": has_Kedar_Yoga,
        "Kedar_Yoga_description": Kedar_Yoga_description,
        "has_Kahal_Yoga": has_Kahal_Yoga,
        "Kahal_Yoga_description": Kahal_Yoga_description,
        "has_Kamal_Yoga": has_Kamal_Yoga,
        "Kamal_Yoga_description": Kamal_Yoga_description,
        "has_Musala_Yoga": has_Musala_Yoga,
        "Musala_Yoga_description": Musala_Yoga_description,
        "has_Raja_Yoga": has_Raja_Yoga,
        "Raja_Yoga_description": Raja_Yoga_description,
        "has_Ruchaka_Yoga": has_Ruchaka_Yoga,
        "Ruchaka_Yoga_description": Ruchaka_Yoga_description,
        "has_Bhadra_Yoga": has_Bhadra_Yoga,
        "Bhadra_Yoga_description": Bhadra_Yoga_description,
        "has_Hamsa_Yoga": has_Hamsa_Yoga,
        "Hamsa_Yoga_description": Hamsa_Yoga_description,
        "has_Malavya_Yoga": has_Malavya_Yoga,
        "Malavya_Yoga_description": Malavya_Yoga_description,
        "has_Sasa_Yoga": has_Sasa_Yoga,
        "Sasa_Yoga_description": Sasa_Yoga_description,
        "has_Sunafa_Yoga": has_Sunafa_Yoga,
        "Sunafa_Yoga_description": Sunafa_Yoga_description,
        "has_Anafa_Yoga": has_Anafa_Yoga,
        "Anafa_Yoga_description": Anafa_Yoga_description,
        "has_Durudhara_Yoga": has_Durudhara_Yoga,
        "Durudhara_Yoga_description": Durudhara_Yoga_description,
        "has_Kemadruma_Yoga": has_Kemadruma_Yoga,
        "Kemadruma_Yoga_description": Kemadruma_Yoga_description,
        "has_Veshi_Yoga": has_Veshi_Yoga,
        "Veshi_Yoga_description": Veshi_Yoga_description,
        "has_Vaasi_Yoga": has_Vaasi_Yoga,
        "Vaasi_Yoga_description": Vaasi_Yoga_description,
        "has_Ubhayachari_Yoga": has_Ubhayachari_Yoga,
        "Ubhayachari_Yoga_description": Ubhayachari_Yoga_description,
        "has_Daridra_Yoga": has_Daridra_Yoga,
        "Daridra_Yoga_description": Daridra_Yoga_description,
        "has_Grahan_Yoga": has_Grahan_Yoga,
        "Grahan_Yoga_description": Grahan_Yoga_description,
        "has_Shakat_Yoga": has_Shakat_Yoga,
        "Shakat_Yoga_description": Shakat_Yoga_description,
        "has_Chandal_Yoga": has_Chandal_Yoga,
        "Chandal_Yoga_description": Chandal_Yoga_description,
        "has_Kuja_Yoga": has_Kuja_Yoga,
        "Kuja_Yoga_description": Kuja_Yoga_description,
        "has_Kemdrum_Yoga": has_Kemdrum_Yoga,
        "Kemdrum_Yoga_description": Kemdrum_Yoga_description
    }
    return row
