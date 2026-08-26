const STORAGE_KEY = "byq.dynamicQr.ownerTokens.v1";

type TokenMap = Record<string, string>;

function readMap(): TokenMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as TokenMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeMap(map: TokenMap): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function saveOwnerToken(shortCode: string, manageToken: string): void {
  const map = readMap();
  map[shortCode] = manageToken;
  writeMap(map);
}

export function getOwnerToken(shortCode: string): string | undefined {
  return readMap()[shortCode];
}

export function listOwnedShortCodes(): string[] {
  return Object.keys(readMap()).sort();
}
