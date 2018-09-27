export default async function authHeader() {
    // return authorization header with jwt token
    let access_token = await JSON.parse(localStorage.getItem('access_token'));
    alert("AT: ",access_token);
    if (access_token) {
        return { 'Authorization': 'token ' + access_token };
    } else {
        return {};
    }
}