export function dfs_xy_conv(lat, lon) {
    const RE = 6371.00877; // 지구 반경 (km)
    const GRID = 5.0; // 격자 간격 (km)
    const SLAT1 = 30.0; // 투영 위도 1 (degree)
    const SLAT2 = 60.0; // 투영 위도 2 (degree)
    const OLON = 126.0; // 기준 경도 (degree)
    const OLAT = 38.0; // 기준 위도 (degree)
    const XO = 43; // 기준점 X좌표 (격자)
    const YO = 136; // 기준점 Y좌표 (격자)

    const DEGRAD = Math.PI / 180.0;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    const sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const sn_log = Math.log(Math.cos(slat1) / Math.cos(slat2));
    const sn_final = Math.log(sn) / sn_log;

    const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    const sf_final = (sf ** sn_final) * (Math.cos(slat1) / sn_final);

    const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    const ro_final = re * sf_final / (ro ** sn_final);

    const ra = Math.tan(Math.PI * 0.25 + (lat) * DEGRAD * 0.5);
    const ra_final = re * sf_final / (ra ** sn_final);

    let theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn_final;

    const x = Math.floor(ra_final * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro_final - ra_final * Math.cos(theta) + YO + 0.5);

    return { x, y };
}