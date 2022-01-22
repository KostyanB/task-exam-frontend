export function parseJSON(JSONstr) {
    let json = {};

    try  {
        json = JSON.parse(JSONstr);
    } catch (e) {
        console.warn('Invalid JSON string');
    }

    return json;
}
