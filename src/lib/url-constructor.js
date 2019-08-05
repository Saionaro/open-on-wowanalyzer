import REGION_CODES from "./region-codes";

export function getReportCode(input) {
  const match = input
    .trim()
    .match(/^(.*reports\/)?([a-zA-Z0-9]{16})\/?(#.*)?$/);

  return match && match[2];
}

export function getFight(input) {
  const match = input.trim().match(/fight=([^&]*)/);

  return match && match[1];
}

export function getPlayer(input) {
  const match = input.trim().match(/source=([^&]*)/);

  return match && match[1];
}

export function getCharacterFromWCLUrl(input) {
  const match = input.trim().match(/^(.*character\/)(\S*)\/(\S*)\/(\S*)/);

  return (
    match && {
      region: match[2],
      realm: match[3],
      name: match[4].split("#")[0]
    }
  );
}

export function getCharacterFromBattleNetUrl(input) {
  const match = input
    .trim()
    .match(/^(.*)\/([A-Za-z]{2}-[A-Za-z]{2})\/(character)\/(\S*)\/(\S*)/);

  return (
    match &&
    REGION_CODES[match[2]] && {
      region: REGION_CODES[match[2]],
      realm: match[4],
      name: match[5].split("#")[0]
    }
  );
}

export function constructURL(value) {
  const code = getReportCode(value);
  const fight = getFight(value);
  const player = getPlayer(value);
  const character =
    getCharacterFromWCLUrl(value) || getCharacterFromBattleNetUrl(value);

  if (character) {
    const constructedUrl = `/character/${character.region}/${character.realm}/${character.name}`;

    return constructedUrl;
  }

  if (code) {
    let constructedUrl = `/report/${code}`;

    if (fight) {
      constructedUrl += `/${fight}`;

      if (player) {
        constructedUrl += `/${player}`;
      }
    }

    return constructedUrl;
  }

  return false;
}
